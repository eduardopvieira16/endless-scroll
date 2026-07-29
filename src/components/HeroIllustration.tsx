export function HeroIllustration() {
    return (<svg className="heroIllustration" viewBox="0 0 620 520" role="img" aria-label="Rede de pessoas conectadas">
      <defs>
        <filter id="soft"><feDropShadow dx="0" dy="12" stdDeviation="16" floodOpacity=".12"/></filter>
      </defs>
      <g strokeLinecap="round" fill="none">
        <path d="M304 250 166 164M304 250 458 125M304 250 492 298M304 250 188 376M304 250 344 430" stroke="#54a6de" strokeWidth="8"/>
        <path d="M304 250 240 89" stroke="#f2b312" strokeWidth="8"/>
        <path d="M304 250 445 414" stroke="#32b7ad" strokeWidth="8"/>
      </g>
      <g filter="url(#soft)">
        <circle cx="304" cy="250" r="105" fill="white" stroke="#50a9df" strokeWidth="8"/>
        <circle cx="304" cy="250" r="68" fill="#eff8ff"/>
        <path d="M258 274c12-35 79-42 91 0v36h-91z" fill="#078ff2"/>
        <circle cx="303" cy="219" r="31" fill="#078ff2"/>
        <path d="M291 214c7 10 16 14 30 13" stroke="white" strokeWidth="6"/>
      </g>
      <g filter="url(#soft)">
        <circle cx="157" cy="158" r="51" fill="white" stroke="#48bcb0" strokeWidth="7"/><circle cx="157" cy="148" r="15" fill="#078ff2"/><path d="M129 184c4-19 14-28 28-28s24 9 28 28" fill="#078ff2"/>
        <circle cx="463" cy="121" r="43" fill="white" stroke="#f17342" strokeWidth="7"/><circle cx="463" cy="112" r="13" fill="#f17342"/><path d="M440 146c4-16 11-24 23-24s19 8 23 24" fill="#f17342"/>
        <circle cx="503" cy="302" r="48" fill="white" stroke="#54a6de" strokeWidth="7"/><circle cx="503" cy="292" r="14" fill="#078ff2"/><path d="M478 329c4-18 12-26 25-26s21 8 25 26" fill="#078ff2"/>
        <circle cx="182" cy="382" r="42" fill="white" stroke="#f17342" strokeWidth="7"/><circle cx="182" cy="373" r="12" fill="#f17342"/><path d="M160 406c3-15 11-23 22-23s19 8 22 23" fill="#f17342"/>
        <circle cx="345" cy="438" r="38" fill="white" stroke="#f2b312" strokeWidth="7"/><circle cx="345" cy="430" r="11" fill="#f2b312"/><path d="M325 460c3-14 10-20 20-20s17 6 20 20" fill="#f2b312"/>
      </g>
      <g fill="#f17342"><circle cx="111" cy="267" r="9"/><circle cx="431" cy="217" r="8"/></g>
      <g fill="#32b7ad"><circle cx="245" cy="425" r="8"/><circle cx="528" cy="191" r="10"/></g>
      <g fill="#f2b312"><circle cx="210" cy="234" r="8"/><circle cx="396" cy="357" r="7"/></g>
    </svg>);
}
