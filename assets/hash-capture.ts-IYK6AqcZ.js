(function(){const v=new Set(["ar","bg","bn","bs","cs","da","de","el","en","es","et","fi","fil","fr","hi","hr","hu","id","it","ja","ka","kk","km","ko","lt","lv","ms","my","nb","nl","pl","pt","ro","ru","si","sk","sl","sq","sr","sv","th","tr","uk","vi","zh-cn","zh-tw","zh-cjv","zh-hans","zh-hant"]);function S(a){const e=a.match(/^\/([a-z]{2}(?:-[a-z]{2,4})?)(\/.*)?$/);return e&&v.has(e[1])?e[2]||"/":a}const y=window.location.hash;y&&(sessionStorage.setItem("roplus_initial_hash",y),sessionStorage.setItem("roplus_initial_hash_url",window.location.href));let h=!0;try{const a=localStorage.getItem("roplus_ui_cache");a&&JSON.parse(a).enabled===!1&&(h=!1)}catch{}try{const a=localStorage.getItem("roplus_theme_cache");if(a&&h){const e=JSON.parse(a),o=localStorage.getItem("theme");let s=!1;if(o)try{const n=JSON.parse(o);n.data&&n.data.length>0&&(s=n.data[0][1]===0)}catch{}const f=S(window.location.pathname).startsWith("/users/");if(e.globalEnabled&&e.colors&&e.preset!=="default"&&e.lightMode===s){const{pageBg:n,cardBg:p,headerBg:t,sidebarBg:i}=e.colors,r=s?"rgba(0, 0, 0, 0.08)":"rgba(255, 255, 255, 0.06)",c={builder:'"Builder Sans", "Source Sans Pro", Arial, sans-serif',gotham:'"Gotham SSm", "Helvetica Neue", Helvetica, Arial, sans-serif',source:'"Source Sans Pro", Arial, Helvetica, sans-serif',inter:'"Inter", -apple-system, BlinkMacSystemFont, sans-serif',system:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'};let d=`
        /* Page background */
        body, body.dark-theme, body.light-theme, #rbx-body {
          background-color: ${n} !important;
        }
        /* Header */
        #header, #header.rbx-header, .rbx-header, #header .container-fluid {
          background-color: ${t} !important;
        }
        /* Sidebar */
        #navigation, #navigation.rbx-left-col, #left-navigation-container,
        .rbx-left-col, .left-col-list, .simplebar-content {
          background-color: ${i} !important;
        }
        /* Navigation container wrapper */
        #navigation-container {
          background-color: ${n} !important;
        }
        /* Sidebar items */
        .left-col-list li:not(.rbx-upgrade-now), .left-col-list a:not(#upgrade-now-button) {
          background-color: transparent !important;
        }
        /* Main content */
        #container-main, main.container-main, #content {
          background-color: ${n} !important;
        }
        /* Footer */
        #footer-container, footer.container-footer {
          background-color: ${i} !important;
        }
      `;if(e.fontFamily&&e.fontFamily!=="builder"){const m=c[e.fontFamily]??c.builder;d+=`
          html, body, * {
            font-family: ${m} !important;
          }
        `}const l=document.createElement("style");l.id="roplus-early-theme",l.textContent=d,(document.head||document.documentElement).appendChild(l),document.documentElement.classList.add("roplus-themed"),document.documentElement.setAttribute("data-roplus-theme",e.preset)}if(f&&e.globalEnabled&&e.preset!=="default"){const n=()=>{var i;(i=document.body)==null||i.setAttribute("data-roplus-profile-loading","true")};document.body?n():document.addEventListener("DOMContentLoaded",n,{once:!0});const p=`
        /* Hide profile gradient elements while loading - prevents flash */
        body[data-roplus-profile-loading] .profile-avatar-gradient {
          background: transparent !important;
        }
        body[data-roplus-profile-loading] .cover-gradient-overlay {
          opacity: 0 !important;
        }
        /* Smooth transition when theme is applied (loading attribute removed) */
        .cover-gradient-overlay {
          transition: opacity 0.15s ease-out !important;
        }
      `,t=document.createElement("style");t.id="roplus-early-profile",t.textContent=p,(document.head||document.documentElement).appendChild(t)}}}catch{}try{if(h){const a=localStorage.getItem("roplus_ui_cache");if(a){const e=JSON.parse(a),o=[];o.push(`
        .left-col-list:not(.roplus-sidebar-ready) { opacity: 0 !important; }
      `),e.streamerMode&&o.push(`
          #nav-robux-amount,
          .age-bracket-label,
          #navigation > ul > li:first-child,
          .profile-header-username,
          .profile-header-title { filter: blur(8px) !important; }
          .roplus-greeting-section,
          .roplus-home-header,
          .roplus-home-skeleton,
          .roplus-best-friends-carousel,
          .roplus-friends-carousel,
          .roplus-skeleton-carousel,
          .people-list-container,
          [class*="friends-carousel"],
          [data-testid="people-list"],
          .roplus-converted-value { display: none !important; }
        `),e.blurSerialNumbers&&o.push(`
          .limited-number-container,
          .collectible-serial-number { filter: blur(6px) !important; }
        `),e.classicTerminology!==!1&&o.push(`
          .people-list-header h2,
          .container-header h2,
          .section-header h2,
          .text-title-medium.content-emphasis,
          a[href*="/friends"] span.text-truncate-end,
          a[href*="/friends"] .text-no-wrap,
          a[href*="/communities"] span.text-truncate-end,
          a[href*="/communities"] .text-no-wrap,
          .chat-search-input[placeholder*="Connection"],
          .settings-list-item-container .setting-name,
          .nav-menu-title {
            opacity: 0;
          }
        `);const s=S(window.location.pathname);if(["/sandbox","/stats","/themes","/charts","/banned-users"].some(r=>s===r||s.startsWith(r+"/"))&&o.push(`
          .request-error-page-content,
          .default-error-page { display: none !important; }
        `),s==="/home"||s==="/home/"){o.push(`
          /* Always hide native "Home" header and shimmer - RoPlus replaces it */
          #HomeContainer > .section > .col-xs-12.container-header:has(> h1:only-child),
          .game-home-page-loading-title.shimmer {
            display: none !important;
          }
        `);const r=e.homeTodaysPicks||"default",c=e.homeStandoutGames||"default",d=e.homeSponsored||"default",l=e.homeCollapseRecommendations!==!1,m=e.homePrioritizeFavorites!==!1,g=r!=="default"||c!=="default"||d!=="default";if(g||l||m)try{const u=document.documentElement;r!=="default"&&u.setAttribute("data-roplus-tp",r),c!=="default"&&u.setAttribute("data-roplus-sg",c),d!=="default"&&u.setAttribute("data-roplus-sp",d),l&&u.setAttribute("data-roplus-cr","1"),m&&u.setAttribute("data-roplus-pf","1");const b=document.createElement("script");b.src=(typeof chrome<"u"?chrome:browser).runtime.getURL("scripts/feed-filter.js"),(document.head||document.documentElement).appendChild(b)}catch{}(g||l||m)&&(document.documentElement.classList.add("roplus-home-layout-pending"),o.push(`
            /* Hide native game sections until layout is applied */
            html.roplus-home-layout-pending .game-home-page-container .game-sort-carousel-wrapper,
            html.roplus-home-layout-pending .game-home-page-container > div > div:not(.friend-carousel-container):not([class*="roplus"]):not(#roplus-game-skeletons) {
              visibility: hidden !important;
              height: 0 !important;
              overflow: hidden !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            /* Hide skeletons when layout is ready */
            html:not(.roplus-home-layout-pending) #roplus-game-skeletons {
              display: none !important;
            }
          `))}if(o.length>0){const r=document.createElement("style");r.id="roplus-early-styles",r.textContent=o.join(`
`),(document.head||document.documentElement).appendChild(r)}const t=[];e.streamerMode&&t.push("roplus-streamer-mode"),e.blurSerialNumbers&&t.push("roplus-blur-serials"),e.classicTerminology!==!1&&t.push("roplus-classic-terminology"),t.length>0&&document.documentElement.classList.add(...t);const i=()=>{t.length>0&&document.body.classList.add(...t)};document.body?i():document.addEventListener("DOMContentLoaded",i,{once:!0})}}}catch{}
})()
