import { getSandbox } from '@cloudflare/sandbox'
import { createOpencodeServer, proxyToOpencode } from '@cloudflare/sandbox/opencode'
import type { Config } from '@opencode-ai/sdk'

export { Sandbox } from '@cloudflare/sandbox'

declare global {
  interface Env {
    ANTHROPIC_API_KEY: string
  }
}

interface ParsedRequest {
  owner: string
  repo: string
  repoUrl: string
  targetDir: string
  userId: string
}

function getOpencodeConfig(env: Env): Config {
  return {
    provider: {
      anthropic: {
        options: {
          apiKey: env.ANTHROPIC_API_KEY,
        },
      },
    },
  }
}

function parseRepoPath(pathname: string): { owner: string; repo: string } | null {
  const parts = pathname.slice(1).split('/')

  if (parts.length < 2 || !parts[0] || !parts[1]) {
    return null
  }

  return {
    owner: parts[0],
    repo: parts[1],
  }
}

function getUserId(request: Request): string {
  const userId = request.headers.get('X-User-Id')
  if (userId) {
    return userId
  }

  const cookies = request.headers.get('Cookie') || ''
  const sessionMatch = cookies.match(/k9_session=([^;]+)/)
  if (sessionMatch) {
    return sessionMatch[1]
  }

  return 'anon'
}

function getSandboxId(owner: string, repo: string, userId: string): string {
  const id = `${owner}-${repo}-${userId}`.toLowerCase().replace(/[^a-z0-9-]/g, '-')
  return id.slice(0, 63)
}

function parseRequest(request: Request): ParsedRequest | null {
  const url = new URL(request.url)
  const repoInfo = parseRepoPath(url.pathname)

  if (!repoInfo) {
    return null
  }

  const { owner, repo } = repoInfo
  const userId = getUserId(request)

  return {
    owner,
    repo,
    repoUrl: `https://github.com/${owner}/${repo}.git`,
    targetDir: `/home/user/${owner}/${repo}`,
    userId,
  }
}

async function ensureRepoFresh(
  sandbox: Awaited<ReturnType<typeof getSandbox>>,
  repoUrl: string,
  targetDir: string,
): Promise<void> {
  const exists = await sandbox.exists(targetDir)

  if (exists.exists) {
    await sandbox.exec(`git -C ${targetDir} fetch origin`, { timeout: 60_000 })
    await sandbox.exec(`git -C ${targetDir} reset --hard origin/HEAD`, {
      timeout: 30_000,
    })
  } else {
    await sandbox.gitCheckout(repoUrl, { targetDir })
  }
}

const USAGE_TEXT = `K9 - Explore repos with AI

Usage: https://usek9.com/{owner}/{repo}

Examples:
  https://usek9.com/facebook/react
  https://usek9.com/vercel/next.js
  https://usek9.com/cloudflare/workers-sdk

Replace any GitHub URL:
  github.com/owner/repo → usek9.com/owner/repo
`

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/health') {
      return Response.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
      })
    }

    if (url.pathname === '/') {
      return new Response(USAGE_TEXT, {
        headers: { 'Content-Type': 'text/plain' },
      })
    }

    const parsed = parseRequest(request)
    if (!parsed) {
      return new Response('Invalid path. Usage: /{owner}/{repo}\nExample: /facebook/react', {
        status: 400,
      })
    }

    const { owner, repo, repoUrl, targetDir, userId } = parsed
    const sandboxId = getSandboxId(owner, repo, userId)
    const sandbox = getSandbox(env.Sandbox, sandboxId)

    try {
      await ensureRepoFresh(sandbox, repoUrl, targetDir)

      const server = await createOpencodeServer(sandbox, {
        config: getOpencodeConfig(env),
        directory: targetDir,
      })

      return await proxyToOpencode(request, sandbox, server)
    } catch (error) {
      console.error(`Error handling ${owner}/${repo}:`, error)

      if (error instanceof Error) {
        if (error.message.includes('not found') || error.message.includes('Repository not found')) {
          return Response.json(
            {
              error: `Repository not found: ${owner}/${repo}`,
              hint: 'Make sure the repository exists and is public',
            },
            { status: 404 },
          )
        }

        if (error.message.includes('rate limit')) {
          return Response.json(
            {
              error: 'GitHub rate limit exceeded',
              hint: 'Please try again in a few minutes',
            },
            { status: 429 },
          )
        }
      }

      return Response.json(
        {
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      )
    }
  },
}
