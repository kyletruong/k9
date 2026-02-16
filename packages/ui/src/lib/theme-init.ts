/**
 * Returns an inline JS snippet that prevents FOUC by applying the correct
 * theme class (`dark`) and `colorScheme` before first paint.
 *
 * Usage in a TanStack Start `shellComponent`:
 * ```tsx
 * <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
 * ```
 */
export function getThemeInitScript(): string {
  return `(function(){
  try{
    var t=localStorage.getItem('theme');
    var c=document.documentElement.classList;
    var s=window.matchMedia('(prefers-color-scheme:dark)').matches;
    var d=t==='dark'||((t==='system'||!t)&&s);
    if(d){c.add('dark')}else{c.remove('dark')}
    document.documentElement.style.colorScheme=d?'dark':'light';
  }catch(e){}
})()`
}
