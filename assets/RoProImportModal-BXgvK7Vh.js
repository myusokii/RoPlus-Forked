import{g as k}from"./browserDetection-CcwcEYyL.js";import{l as I,b as C}from"./logger-BetE19VS.js";import{a as R,s as M,Z as T,e as S,Y as D}from"./Toast-C2LjXNHC.js";import{b1 as O,b2 as _,b3 as F,b4 as N,b5 as L,b6 as $,v as z}from"./roplus-social-CHE3y69o.js";async function E(o){const r=await R({type:"ROBLOX_GET_GAME_DETAILS",payload:{universeIds:o}});if(!r.success||!r.data)return new Map;const t=new Map;for(const[i,s]of Object.entries(r.data))t.set(Number(i),{name:s.name,rootPlaceId:s.rootPlaceId});return t}async function J(){try{const o=await F();if(o.length===0)return!1;const r=await E(o);return r.size===0?!1:(await N(r),!0)}catch(o){return I.debug("Failed to hydrate tracked game names:",o),!1}}async function A(){try{const o=await O();if(o.length===0)return;const r=await E(o);if(r.size===0)return;await _(r)}catch(o){I.debug("Failed to hydrate imported game names:",o)}}const w="(async()=>{console.log('Reading credentials...');const auth={'ropro-id':(await chrome.storage.sync.get('rpUserID')).rpUserID,'ropro-verification':Object.values((await chrome.storage.sync.get('userVerification')).userVerification)[0]};if(!auth['ropro-id'])throw new Error('RoPro user ID not found. Is RoPro installed?');console.log('Fetching playtime...');const times=[7,30,365,999];let done=0;const fetches=times.map(t=>fetch(`https://api.ropro.io/getMostPlayedUniverse.php?time=${t}`,{method:'POST',headers:auth,credentials:'include'}).then(async r=>{if(!r.ok){const txt=await r.text().catch(()=>'');if(txt.includes('<!DOCTYPE')||txt.includes('cloudflare'))throw new Error('RoPro API is down (error '+r.status+'). Try again later.');throw new Error('API error: '+r.status)}const txt=await r.text();let data;try{data=JSON.parse(txt)}catch{if(txt.includes('<!DOCTYPE')||txt.includes('cloudflare'))throw new Error('RoPro API is down. Try again later.');throw new Error('Invalid data for time='+t)}console.log(`Fetched ${++done}/4`);return{time:t,data}}));const results=await Promise.all(fetches);const games={};results.forEach(({time,data})=>{data.forEach(g=>{if(!games[g.id])games[g.id]={id:g.id,time_played:{7:0,30:0,365:0,999:0}};games[g.id].time_played[time]=g.time_played;});});const arr=Object.values(games);console.log(arr.length+' games found. Right-click the array below > Copy object');console.log(arr)})().catch(e=>console.error('Import failed:',e.message))";let a=null,d=null;function G(o){if(!Array.isArray(o))return{valid:!1,error:"Invalid data format. Expected an array."};if(o.length===0)return{valid:!1,error:"No games found in the data."};let r=!1;for(let t=0;t<o.length;t++){const i=o[t];if(!i||typeof i!="object")return{valid:!1,error:`Invalid entry at position ${t}.`};if(!("id"in i)||!("time_played"in i))return{valid:!1,error:`Entry at position ${t} missing required fields.`};const s=i.time_played;if(typeof s=="object"&&s!==null&&!Array.isArray(s)){if(r=!0,typeof s[999]!="number"||s[999]<0)return{valid:!1,error:`Entry at position ${t} missing valid time_played[999].`}}else if(typeof s=="number"){if(s<0)return{valid:!1,error:`Invalid time_played value at position ${t}.`}}else return{valid:!1,error:`Entry at position ${t} has invalid time_played type.`}}return{valid:!0,games:o,isEnhanced:r}}function g(){if(d==null||d.unbind(),d=null,a){const o=a;a=null,o.classList.add("roplus-modal-hiding"),o.classList.remove("roplus-modal-visible"),setTimeout(()=>o.remove(),150)}}function W(o={}){var f,v,y,h;const{onSuccess:r,onClose:t,useAlertForSuccess:i=!1}=o;g();const s=k();a=document.createElement("div"),a.className="roplus-modal-overlay",M(a,`
    <style>
      .roplus-ropro-import-desc {
        margin: 0;
        font-size: 14px;
        color: var(--roplus-text-secondary);
        line-height: 1.5;
      }
      .roplus-ropro-import-steps {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .roplus-ropro-import-step {
        display: flex;
        gap: 12px;
      }
      .roplus-ropro-import-step-num {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--roplus-btn-fill);
        color: var(--roplus-btn-text);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
        flex-shrink: 0;
      }
      .roplus-ropro-import-step-content {
        flex: 1;
        min-width: 0;
      }
      .roplus-ropro-import-step-title {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 4px;
      }
      .roplus-ropro-import-step-desc {
        font-size: 13px;
        color: var(--roplus-text-secondary);
        line-height: 1.5;
      }
      .roplus-ropro-import-step-desc code {
        background: var(--roplus-surface-200);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 12px;
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
      }
      .roplus-ropro-import-step-desc a {
        color: var(--roplus-text-secondary);
        text-decoration: none;
        cursor: pointer;
      }
      .roplus-ropro-import-step-desc a:hover { text-decoration: underline; }
      .roplus-ropro-import-step-desc a code { color: inherit; }
      .roplus-ropro-import-code-container {
        position: relative;
        margin-top: 8px;
      }
      .roplus-ropro-import-code {
        display: block;
        background: var(--roplus-surface-200);
        padding: 12px;
        border-radius: 8px;
        font-size: 11px;
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
        word-break: break-all;
        line-height: 1.5;
        max-height: 160px;
        overflow-y: auto;
      }
      .roplus-ropro-import-copy-btn {
        display: block;
        margin-left: auto;
        margin-top: 8px;
        padding: 6px 12px;
        border-radius: 6px;
        border: none;
        background: var(--roplus-btn-fill);
        color: var(--roplus-btn-text);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.15s, background 0.15s;
      }
      .roplus-ropro-import-copy-btn:hover { opacity: 0.9; }
      .roplus-ropro-import-copy-btn.copied { background: var(--roplus-success); }
      .roplus-ropro-import-textarea {
        width: 100%;
        background: var(--roplus-surface-200);
        border: 1px solid var(--roplus-border);
        border-radius: 8px;
        padding: 12px;
        color: inherit;
        font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
        font-size: 12px;
        resize: vertical;
        margin-top: 8px;
        box-sizing: border-box;
        min-height: 80px;
      }
      .roplus-ropro-import-textarea:focus {
        outline: none;
        border-color: var(--roplus-text-muted);
      }
      .roplus-ropro-import-error {
        color: var(--roplus-danger);
        font-size: 12px;
        margin-top: 8px;
        min-height: 18px;
      }
    </style>

    <div class="roplus-modal roplus-modal-lg">
      <div class="roplus-modal-close-wrap">
        <button class="roplus-modal-close" id="roplus-import-close" aria-label="Close">
          ${T()}
        </button>
      </div>
      <div class="roplus-modal-body">
        <h2 class="roplus-modal-title">Import from RoPro</h2>
        <div class="roplus-modal-content">
          <p class="roplus-ropro-import-desc">
            Transfer your playtime history from RoPro before disabling it.
          </p>

          <div class="roplus-ropro-import-steps">
            <div class="roplus-ropro-import-step">
              <div class="roplus-ropro-import-step-num">1</div>
              <div class="roplus-ropro-import-step-content">
                <div class="roplus-ropro-import-step-title">Open RoPro's console</div>
                <div class="roplus-ropro-import-step-desc">
                  Go to <a id="roplus-import-ext-link"><code>${s.urlDisplay}</code></a>, enable <strong>"Developer mode"</strong> (top-right), find <strong>RoPro</strong>, click <strong>"Service Worker"</strong>
                </div>
              </div>
            </div>
            <div class="roplus-ropro-import-step">
              <div class="roplus-ropro-import-step-num">2</div>
              <div class="roplus-ropro-import-step-content">
                <div class="roplus-ropro-import-step-title">Run this command</div>
                <div class="roplus-ropro-import-step-desc">Paste into the console and press Enter. This fetches your data from RoPro's servers. If prompted, type <strong>allow pasting</strong> first.</div>
                <div class="roplus-ropro-import-code-container">
                  <code class="roplus-ropro-import-code">${S(w)}</code>
                  <button class="roplus-ropro-import-copy-btn" id="roplus-import-copy">Copy</button>
                </div>
              </div>
            </div>
            <div class="roplus-ropro-import-step">
              <div class="roplus-ropro-import-step-num">3</div>
              <div class="roplus-ropro-import-step-content">
                <div class="roplus-ropro-import-step-title">Copy the result</div>
                <div class="roplus-ropro-import-step-desc">Right-click the array output, select <strong>"Copy object"</strong>, paste below.</div>
                <textarea id="roplus-import-data" class="roplus-ropro-import-textarea" rows="3" placeholder='[{"id":"123","time_played":100},...]'></textarea>
                <div class="roplus-ropro-import-error" id="roplus-import-error"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="roplus-modal-footer">
        <div class="roplus-modal-actions">
          <button class="roplus-btn roplus-btn-secondary" id="roplus-import-cancel">Cancel</button>
          <button class="roplus-btn roplus-btn-primary" id="roplus-import-submit">Import</button>
        </div>
      </div>
    </div>
  `),document.body.appendChild(a),requestAnimationFrame(()=>a==null?void 0:a.classList.add("roplus-modal-visible"));const u=()=>{g(),t==null||t()};d=D(u),d.bind();const m=document.getElementById("roplus-import-ext-link");m==null||m.addEventListener("click",async l=>{l.preventDefault();try{await C.runtime.sendMessage({type:"OPEN_EXTENSIONS_PAGE"})}catch{try{await navigator.clipboard.writeText(s.url);const e=m.querySelector("code");if(e){const p=e.textContent;e.textContent="Copied!",setTimeout(()=>{e.textContent=p},1500)}}catch{alert(`Copy this URL: ${s.url}`)}}}),(f=document.getElementById("roplus-import-close"))==null||f.addEventListener("click",u),(v=document.getElementById("roplus-import-cancel"))==null||v.addEventListener("click",u),a.addEventListener("click",l=>{l.target===a&&u()}),(y=document.getElementById("roplus-import-copy"))==null||y.addEventListener("click",async l=>{const e=l.target;try{await navigator.clipboard.writeText(w),e.textContent="Copied!",e.classList.add("copied"),setTimeout(()=>{e.textContent="Copy",e.classList.remove("copied")},2e3)}catch{e.textContent="Failed"}}),(h=document.getElementById("roplus-import-submit"))==null||h.addEventListener("click",async()=>{const l=document.getElementById("roplus-import-data"),e=document.getElementById("roplus-import-error"),p=document.getElementById("roplus-import-submit"),b=l.value.trim();if(!b){e.textContent="Paste your data first";return}let x;try{x=JSON.parse(b)}catch{e.textContent="Invalid JSON. Make sure you copied the entire output.";return}const c=G(x);if(!c.valid||!c.games){e.textContent=c.error||"Invalid data format.";return}p.textContent=c.isEnhanced?"Importing (with time periods)...":"Importing...",p.disabled=!0;try{const n=await L(c.games);p.textContent="Fetching game names...",await A(),await $({status:"completed",lastImportedAt:Date.now(),gamesImported:n.gamesImported,totalMinutesImported:n.totalMinutes}),g();const P=n.isEnhanced?" with time period data":"";i&&alert(`Imported ${n.gamesImported} games (${z(n.totalMinutes)})${P}!

Now disable RoPro and refresh.`),r==null||r(n),t==null||t()}catch(n){e.textContent=n instanceof Error?n.message:"Import failed",p.textContent="Import",p.disabled=!1}})}export{J as a,A as h,W as s};
