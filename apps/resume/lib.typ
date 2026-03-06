/*
 * Personal fork of @preview/basic-resume
 */

#let normalize-url(url) = {
  if url == "" {
    ""
  } else if url.contains("://") {
    url
  } else {
    "https://" + url
  }
}

#let resume(
  author: "",
  author-position: left,
  personal-info-position: left,
  pronouns: "",
  location: "",
  email: "",
  github: "",
  linkedin: "",
  phone: "",
  personal-site: "",
  orcid: "",
  accent-color: "#000000",
  font: "New Computer Modern",
  paper: "us-letter",
  author-font-size: 20pt,
  font-size: 10pt,
  lang: "en",
  body,
) = {
  // Sets document metadata
  set document(author: author, title: author)

  // Document-wide formatting, including font and margins
  set text(
    // LaTeX style font
    font: font,
    size: font-size,
    lang: lang,
    // Disable ligatures so ATS systems do not get confused when parsing fonts.
    ligatures: false,
  )

  // Recommended to have 0.5in margin on all sides
  set page(
    margin: 0.5in,
    paper: paper,
  )

  // Link styles
  show link: underline

  // Small caps for section titles
  show heading.where(level: 2): it => [
    #pad(top: 0pt, bottom: -10pt, [#smallcaps(it.body)])
    #line(length: 100%, stroke: 1pt)
  ]

  // Accent color styling
  show heading: set text(
    fill: rgb(accent-color),
  )

  show link: set text(
    fill: rgb(accent-color),
  )

  // Name will be aligned and large
  show heading.where(level: 1): it => [
    #set align(author-position)
    #set text(
      weight: 700,
      size: author-font-size,
    )
    #pad(it.body)
  ]

  // Level 1 heading
  [= #(author)]

  // Personal info helper
  let contact-item(value, prefix: "", link-type: "") = {
    if value != "" {
      if link-type == "https://" {
        link(normalize-url(value))[#(prefix + value)]
      } else if link-type != "" {
        link(link-type + value)[#(prefix + value)]
      } else {
        value
      }
    }
  }

  // Personal info
  pad(
    top: 0.25em,
    align(personal-info-position)[
      #{
        let items = (
          contact-item(pronouns),
          contact-item(phone),
          contact-item(location),
          contact-item(email, link-type: "mailto:"),
          contact-item(github, link-type: "https://"),
          contact-item(linkedin, link-type: "https://"),
          contact-item(personal-site, link-type: "https://"),
          contact-item(orcid, prefix: "orcid.org/", link-type: "https://orcid.org/"),
        )
        items.filter(x => x != none).join("  |  ")
      }
    ],
  )

  // Main body.
  set par(justify: true)

  body
}

// Generic two by two component for resume
#let generic-two-by-two(
  top-left: "",
  top-right: "",
  bottom-left: "",
  bottom-right: "",
) = {
  [
    #top-left #h(1fr) #top-right \
    #bottom-left #h(1fr) #bottom-right
  ]
}

// Generic one by two component for resume
#let generic-one-by-two(
  left: "",
  right: "",
) = {
  [
    #left #h(1fr) #right
  ]
}

// Cannot use normal --- ligature because ligatures are disabled for ATS compatibility.
#let dates-helper(
  start-date: "",
  end-date: "",
) = {
  start-date + " " + $dash.em$ + " " + end-date
}

// Generic resume entry that can render either 1x2 or 2x2 blocks.
#let entry(
  left: none,
  right: none,
  top-left: none,
  top-right: none,
  bottom-left: none,
  bottom-right: none,
  gap-before: 0pt,
) = [
  #let is-two-by-two = top-left != none or top-right != none or bottom-left != none or bottom-right != none

  #if gap-before != 0pt [
    #v(gap-before)
  ]

  #if is-two-by-two [
    #generic-two-by-two(
      top-left: if top-left != none { top-left } else { [] },
      top-right: if top-right != none { top-right } else { [] },
      bottom-left: if bottom-left != none { bottom-left } else { [] },
      bottom-right: if bottom-right != none { bottom-right } else { [] },
    )
  ] else [
    #generic-one-by-two(
      left: if left != none { left } else { [] },
      right: if right != none { right } else { [] },
    )
  ]
]
