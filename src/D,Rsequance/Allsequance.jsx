import React, { useState, useCallback, useRef } from 'react';
import Allnavbar from '../Home/Allnavbar';
import Allfooter from '../Home/Allfooter';


// ═══════════════════════════════════════════════════════════════
//  DATA TABLES
// ═══════════════════════════════════════════════════════════════

const codonTable = {
  "AUG":"Methionine","UUU":"Phenylalanine","UUC":"Phenylalanine",
  "UUA":"Leucine","UUG":"Leucine","UCU":"Serine","UCC":"Serine",
  "UCA":"Serine","UCG":"Serine","UAU":"Tyrosine","UAC":"Tyrosine",
  "UGU":"Cysteine","UGC":"Cysteine","UGG":"Tryptophan","CUU":"Leucine",
  "CUC":"Leucine","CUA":"Leucine","CUG":"Leucine","CCU":"Proline",
  "CCC":"Proline","CCA":"Proline","CCG":"Proline","CAU":"Histidine",
  "CAC":"Histidine","CAA":"Glutamine","CAG":"Glutamine","CGU":"Arginine",
  "CGC":"Arginine","CGA":"Arginine","CGG":"Arginine","AUU":"Isoleucine",
  "AUC":"Isoleucine","AUA":"Isoleucine","ACU":"Threonine","ACC":"Threonine",
  "ACA":"Threonine","ACG":"Threonine","AAU":"Asparagine","AAC":"Asparagine",
  "AAA":"Lysine","AAG":"Lysine","AGU":"Serine","AGC":"Serine","AGA":"Arginine",
  "AGG":"Arginine","GUU":"Valine","GUC":"Valine","GUA":"Valine","GUG":"Valine",
  "GCU":"Alanine","GCC":"Alanine","GCA":"Alanine","GCG":"Alanine",
  "GAU":"Aspartic acid","GAC":"Aspartic acid","GAA":"Glutamic acid","GAG":"Glutamic acid",
  "GGU":"Glycine","GGC":"Glycine","GGA":"Glycine","GGG":"Glycine"
};
const STOP_CODONS = ['UAA','UAG','UGA'];

const aminoAcidMW = {
  Glycine:57.05,Alanine:71.08,Valine:99.13,Leucine:113.16,Isoleucine:113.16,
  Proline:97.12,Phenylalanine:147.18,Tryptophan:186.21,Methionine:131.20,
  Serine:87.08,Threonine:101.10,Cysteine:103.14,Tyrosine:163.18,Asparagine:114.10,
  Glutamine:128.13,"Aspartic acid":115.09,"Glutamic acid":129.12,
  Lysine:128.17,Arginine:156.19,Histidine:137.14
};

const pKaTable = {
  Lysine:{pKa:10.53,sign:+1},Arginine:{pKa:12.48,sign:+1},Histidine:{pKa:6.00,sign:+1},
  "Aspartic acid":{pKa:3.86,sign:-1},"Glutamic acid":{pKa:4.07,sign:-1},
  Cysteine:{pKa:8.18,sign:-1},Tyrosine:{pKa:10.46,sign:-1}
};

const hydrophobicity = {
  Isoleucine:4.5,Valine:4.2,Leucine:3.8,Phenylalanine:2.8,Cysteine:2.5,
  Methionine:1.9,Alanine:1.8,Glycine:-0.4,Threonine:-0.7,Serine:-0.8,
  Tryptophan:-0.9,Tyrosine:-1.3,Proline:-1.6,Histidine:-3.2,
  "Glutamic acid":-3.5,Glutamine:-3.5,"Aspartic acid":-3.5,
  Asparagine:-3.5,Lysine:-3.9,Arginine:-4.5
};

const bulkiness = {
  Alanine:11.50,Arginine:14.28,Asparagine:12.82,"Aspartic acid":11.68,
  Cysteine:13.46,Glutamine:14.45,"Glutamic acid":13.57,Glycine:3.40,
  Histidine:13.69,Isoleucine:21.40,Leucine:21.40,Lysine:15.71,
  Methionine:16.25,Phenylalanine:19.80,Proline:17.43,Serine:9.47,
  Threonine:15.77,Tryptophan:21.67,Tyrosine:18.03,Valine:21.57
};

const flexibility = {
  Alanine:0.360,Arginine:0.530,Asparagine:0.460,"Aspartic acid":0.510,
  Cysteine:0.350,Glutamine:0.490,"Glutamic acid":0.500,Glycine:0.540,
  Histidine:0.320,Isoleucine:0.460,Leucine:0.370,Lysine:0.470,
  Methionine:0.300,Phenylalanine:0.310,Proline:0.510,Serine:0.510,
  Threonine:0.440,Tryptophan:0.310,Tyrosine:0.420,Valine:0.390
};

const singleLetter = {
  Glycine:'G',Alanine:'A',Valine:'V',Leucine:'L',Isoleucine:'I',
  Proline:'P',Phenylalanine:'F',Tryptophan:'W',Methionine:'M',
  Serine:'S',Threonine:'T',Cysteine:'C',Tyrosine:'Y',Asparagine:'N',
  Glutamine:'Q',"Aspartic acid":'D',"Glutamic acid":'E',
  Lysine:'K',Arginine:'R',Histidine:'H'
};

const threeLetter = {
  Glycine:'Gly',Alanine:'Ala',Valine:'Val',Leucine:'Leu',Isoleucine:'Ile',
  Proline:'Pro',Phenylalanine:'Phe',Tryptophan:'Trp',Methionine:'Met',
  Serine:'Ser',Threonine:'Thr',Cysteine:'Cys',Tyrosine:'Tyr',Asparagine:'Asn',
  Glutamine:'Gln',"Aspartic acid":'Asp',"Glutamic acid":'Glu',
  Lysine:'Lys',Arginine:'Arg',Histidine:'His'
};

const aaGroups = {
  Glycine:'Nonpolar',Alanine:'Nonpolar',Valine:'Nonpolar',Leucine:'Nonpolar',
  Isoleucine:'Nonpolar',Proline:'Nonpolar',Phenylalanine:'Aromatic',
  Tryptophan:'Aromatic',Methionine:'Nonpolar',Serine:'Polar',Threonine:'Polar',
  Cysteine:'Polar',Tyrosine:'Aromatic',Asparagine:'Polar',Glutamine:'Polar',
  "Aspartic acid":'Acidic',"Glutamic acid":'Acidic',
  Lysine:'Basic',Arginine:'Basic',Histidine:'Basic'
};

const AA_LETTERS = ['A','C','D','E','F','G','H','I','K','L','M','N','P','Q','R','S','T','V','W','Y'];

// BLOSUM62 simplified (for alignment scoring)
const BLOSUM62 = {
  'A':{'A':4,'R':-1,'N':-2,'D':-2,'C':0,'Q':-1,'E':-1,'G':0,'H':-2,'I':-1,'L':-1,'K':-1,'M':-1,'F':-2,'P':-1,'S':1,'T':0,'W':-3,'Y':-2,'V':0},
  'R':{'A':-1,'R':5,'N':0,'D':-2,'C':-3,'Q':1,'E':0,'G':-2,'H':0,'I':-3,'L':-2,'K':2,'M':-1,'F':-3,'P':-2,'S':-1,'T':-1,'W':-3,'Y':-2,'V':-3},
  'N':{'A':-2,'R':0,'N':6,'D':1,'C':-3,'Q':0,'E':0,'G':0,'H':1,'I':-3,'L':-3,'K':0,'M':-2,'F':-3,'P':-2,'S':1,'T':0,'W':-4,'Y':-2,'V':-3},
  'D':{'A':-2,'R':-2,'N':1,'D':6,'C':-3,'Q':0,'E':2,'G':-1,'H':-1,'I':-3,'L':-4,'K':-1,'M':-3,'F':-3,'P':-1,'S':0,'T':-1,'W':-4,'Y':-3,'V':-3},
  'C':{'A':0,'R':-3,'N':-3,'D':-3,'C':9,'Q':-3,'E':-4,'G':-3,'H':-3,'I':-1,'L':-1,'K':-3,'M':-1,'F':-2,'P':-3,'S':-1,'T':-1,'W':-2,'Y':-2,'V':-1},
  'Q':{'A':-1,'R':1,'N':0,'D':0,'C':-3,'Q':5,'E':2,'G':-2,'H':0,'I':-3,'L':-2,'K':1,'M':0,'F':-3,'P':-1,'S':0,'T':-1,'W':-2,'Y':-1,'V':-2},
  'E':{'A':-1,'R':0,'N':0,'D':2,'C':-4,'Q':2,'E':5,'G':-2,'H':0,'I':-3,'L':-3,'K':1,'M':-2,'F':-3,'P':-1,'S':0,'T':-1,'W':-3,'Y':-2,'V':-2},
  'G':{'A':0,'R':-2,'N':0,'D':-1,'C':-3,'Q':-2,'E':-2,'G':6,'H':-2,'I':-4,'L':-4,'K':-2,'M':-3,'F':-3,'P':-2,'S':0,'T':-2,'W':-2,'Y':-3,'V':-3},
  'H':{'A':-2,'R':0,'N':1,'D':-1,'C':-3,'Q':0,'E':0,'G':-2,'H':8,'I':-3,'L':-3,'K':-1,'M':-2,'F':-1,'P':-2,'S':-1,'T':-2,'W':-2,'Y':2,'V':-3},
  'I':{'A':-1,'R':-3,'N':-3,'D':-3,'C':-1,'Q':-3,'E':-3,'G':-4,'H':-3,'I':4,'L':2,'K':-3,'M':1,'F':0,'P':-3,'S':-2,'T':-1,'W':-3,'Y':-1,'V':3},
  'L':{'A':-1,'R':-2,'N':-3,'D':-4,'C':-1,'Q':-2,'E':-3,'G':-4,'H':-3,'I':2,'L':4,'K':-2,'M':2,'F':0,'P':-3,'S':-2,'T':-1,'W':-2,'Y':-1,'V':1},
  'K':{'A':-1,'R':2,'N':0,'D':-1,'C':-3,'Q':1,'E':1,'G':-2,'H':-1,'I':-3,'L':-2,'K':5,'M':-1,'F':-3,'P':-1,'S':0,'T':-1,'W':-3,'Y':-2,'V':-2},
  'M':{'A':-1,'R':-1,'N':-2,'D':-3,'C':-1,'Q':0,'E':-2,'G':-3,'H':-2,'I':1,'L':2,'K':-1,'M':5,'F':0,'P':-2,'S':-1,'T':-1,'W':-1,'Y':-1,'V':1},
  'F':{'A':-2,'R':-3,'N':-3,'D':-3,'C':-2,'Q':-3,'E':-3,'G':-3,'H':-1,'I':0,'L':0,'K':-3,'M':0,'F':6,'P':-4,'S':-2,'T':-2,'W':1,'Y':3,'V':-1},
  'P':{'A':-1,'R':-2,'N':-2,'D':-1,'C':-3,'Q':-1,'E':-1,'G':-2,'H':-2,'I':-3,'L':-3,'K':-1,'M':-2,'F':-4,'P':7,'S':-1,'T':-1,'W':-4,'Y':-3,'V':-2},
  'S':{'A':1,'R':-1,'N':1,'D':0,'C':-1,'Q':0,'E':0,'G':0,'H':-1,'I':-2,'L':-2,'K':0,'M':-1,'F':-2,'P':-1,'S':4,'T':1,'W':-3,'Y':-2,'V':-2},
  'T':{'A':0,'R':-1,'N':0,'D':-1,'C':-1,'Q':-1,'E':-1,'G':-2,'H':-2,'I':-1,'L':-1,'K':-1,'M':-1,'F':-2,'P':-1,'S':1,'T':5,'W':-2,'Y':-2,'V':0},
  'W':{'A':-3,'R':-3,'N':-4,'D':-4,'C':-2,'Q':-2,'E':-3,'G':-2,'H':-2,'I':-3,'L':-2,'K':-3,'M':-1,'F':1,'P':-4,'S':-3,'T':-2,'W':11,'Y':2,'V':-3},
  'Y':{'A':-2,'R':-2,'N':-2,'D':-3,'C':-2,'Q':-1,'E':-2,'G':-3,'H':2,'I':-1,'L':-1,'K':-2,'M':-1,'F':3,'P':-3,'S':-2,'T':-2,'W':2,'Y':7,'V':-1},
  'V':{'A':0,'R':-3,'N':-3,'D':-3,'C':-1,'Q':-2,'E':-2,'G':-3,'H':-3,'I':3,'L':1,'K':-2,'M':1,'F':-1,'P':-2,'S':-2,'T':0,'W':-3,'Y':-1,'V':4}
};

// ═══════════════════════════════════════════════════════════════
//  CORE CALCULATIONS
// ═══════════════════════════════════════════════════════════════

const convertDNAToRNA = s => s.replace(/T/g,'U');
const generateComplementary = s => {
  const isRNA = s.includes('U');
  return s.split('').map(b=>isRNA?({A:'U',U:'A',C:'G',G:'C'}[b]||'-'):({A:'T',T:'A',C:'G',G:'C'}[b]||'-')).join('');
};
const generateReverseComplement = s => generateComplementary(s).split('').reverse().join('');
const calculateGC = s => { const gc=s.split('').filter(b=>b==='G'||b==='C').length; return s.length?(gc/s.length)*100:0; };
const calculateAT = s => { const at=s.split('').filter(b=>b==='A'||b==='T'||b==='U').length; return s.length?(at/s.length)*100:0; };
const calcNucleotidePct = s => {
  const c={A:0,T:0,C:0,G:0,U:0};
  s.split('').forEach(b=>{if(c[b]!==undefined)c[b]++;});
  return Object.fromEntries(Object.entries(c).map(([k,v])=>[k,(v/s.length*100)||0]));
};
const calcTm = s => {
  const dna=s.replace(/U/g,'T');
  const gc=dna.split('').filter(b=>b==='G'||b==='C').length;
  const at=dna.split('').filter(b=>b==='A'||b==='T').length;
  if(dna.length<14) return `${gc*4+at*2} °C (Wallace)`;
  return `${(81.5+16.6*Math.log10(0.05)+0.41*(gc/dna.length*100)-675/dna.length).toFixed(1)} °C`;
};
const calcIsoelectricPoint = counts => {
  const chargeAt = pH => {
    let q=1/(1+Math.pow(10,pH-9.69))-1/(1+Math.pow(10,2.34-pH));
    Object.entries(pKaTable).forEach(([aa,{pKa,sign}])=>{
      const n=counts[aa]||0; if(!n) return;
      q+=sign>0?n/(1+Math.pow(10,pH-pKa)):-n/(1+Math.pow(10,pKa-pH));
    });
    return q;
  };
  let lo=0,hi=14;
  for(let i=0;i<200;i++){const m=(lo+hi)/2;chargeAt(m)>0?(lo=m):(hi=m);}
  return ((lo+hi)/2).toFixed(2);
};
const calcExtCoeff = counts => (counts['Tryptophan']||0)*5500+(counts['Tyrosine']||0)*1490+(counts['Cysteine']||0)*125;
const calcGRAVY = aaSeq => aaSeq.length?(aaSeq.reduce((s,aa)=>s+(hydrophobicity[aa]||0),0)/aaSeq.length).toFixed(3):'0';
const calcInstability = aaSeq => {
  const DIWV={WW:1.0,WC:1.0,WT:0.838,WS:1.0,WR:0.5,WN:0.5,WD:1.0,WQ:0.5,WK:0.5,WE:1.0,CW:1.0,CC:1.0,CP:1.0,CQ:1.0,CA:0.5,CG:0.5,CV:0.5,KN:1.0,KQ:1.0,KP:1.0,KK:1.0,HA:1.0,HR:1.0,HN:1.0};
  if(aaSeq.length<2) return 'N/A';
  let s=0;
  for(let i=0;i<aaSeq.length-1;i++){const k=(singleLetter[aaSeq[i]]||'')+(singleLetter[aaSeq[i+1]]||'');s+=DIWV[k]||1.0;}
  return((10/aaSeq.length)*s).toFixed(2);
};
const calcAliphaticIndex = (counts,total) => {
  if(!total) return '0';
  const A=(counts.Alanine||0)/total,V=(counts.Valine||0)/total,I=(counts.Isoleucine||0)/total,L=(counts.Leucine||0)/total;
  return(100*(A+2.9*V+3.9*(I+L))).toFixed(2);
};
const calcAvgFlexibility = aaSeq => aaSeq.length?(aaSeq.reduce((s,aa)=>s+(flexibility[aa]||0.4),0)/aaSeq.length).toFixed(4):'0';
const calcAvgBulkiness = aaSeq => aaSeq.length?(aaSeq.reduce((s,aa)=>s+(bulkiness[aa]||15),0)/aaSeq.length).toFixed(2):'0';

const findORFs = seq => {
  const rna=seq.includes('U')?seq:convertDNAToRNA(seq);
  const orfs=[];
  for(let i=0;i<rna.length-2;i++){
    if(rna.substring(i,i+3)==='AUG'){
      for(let j=i+3;j<rna.length-2;j+=3){
        if(STOP_CODONS.includes(rna.substring(j,j+3))){orfs.push({start:i+1,end:j+3,length:j+3-i,codons:(j-i)/3});break;}
      }
    }
  }
  return orfs;
};

const parseProtein = rnaSeq => {
  const codons=[],aaSeq=[];
  for(let i=0;i<rnaSeq.length-2;i+=3){
    const codon=rnaSeq.substring(i,i+3);
    if(codon.length<3) break;
    const aa=codonTable[codon];
    const isStop=STOP_CODONS.includes(codon);
    codons.push({codon,aa:aa||'?',isStop,position:i/3+1});
    if(isStop) break;
    if(aa) aaSeq.push(aa);
  }
  return{codons,aaSeq};
};

const extractFASTA = content => {
  const lines=content.split('\n');
  let seq='',header='';
  lines.forEach(l=>{if(l.startsWith('>'))header+=l.trim()+' ';else seq+=l.trim();});
  return{sequence:seq.toUpperCase(),header};
};

const extractFASTQ = content => {
  const lines=content.split('\n');
  let seq='',quality='';
  for(let i=1;i<lines.length;i+=4){seq+=lines[i]?.trim()||'';quality+=lines[i+3]?.trim()||'';}
  return{sequence:seq.toUpperCase(),qualityScores:quality};
};

const formatSeq = (seq,len=60) => {
  const lines=[];
  for(let i=0;i<seq.length;i+=len) lines.push(seq.substring(i,i+len));
  return lines.join('\n');
};

// ─── PDB PARSER ───────────────────────────────────────────────
const parsePDB = content => {
  const lines = content.split('\n');
  const atoms = [];
  const chains = new Set();
  const residues = new Map();
  let proteinName = '';
  let organism = '';

  lines.forEach(line => {
    if (line.startsWith('HEADER')) proteinName = line.substring(10, 50).trim();
    if (line.startsWith('SOURCE') && line.includes('ORGANISM_SCIENTIFIC')) {
      organism = line.split(':')[1]?.replace(';','').trim() || '';
    }
    if (line.startsWith('COMPND') && !proteinName) {
      const m = line.match(/MOLECULE:\s*(.+?);/);
      if (m) proteinName = m[1].trim();
    }
    if (line.startsWith('ATOM') || line.startsWith('HETATM')) {
      const atomName = line.substring(12,16).trim();
      const resName  = line.substring(17,20).trim();
      const chainId  = line.substring(21,22).trim();
      const resSeq   = parseInt(line.substring(22,26).trim());
      const x        = parseFloat(line.substring(30,38));
      const y        = parseFloat(line.substring(38,46));
      const z        = parseFloat(line.substring(46,54));
      const bFactor  = parseFloat(line.substring(60,66)) || 0;
      if (!isNaN(x)) {
        chains.add(chainId);
        const key = `${chainId}_${resSeq}`;
        if (!residues.has(key)) residues.set(key,{resName,chainId,resSeq,atoms:[],bFactor});
        residues.get(key).atoms.push({atomName,x,y,z});
        if (atomName==='CA') atoms.push({resName,chainId,resSeq,x,y,z,bFactor});
      }
    }
  });

  const three2one = {
    ALA:'A',ARG:'R',ASN:'N',ASP:'D',CYS:'C',GLN:'Q',GLU:'E',
    GLY:'G',HIS:'H',ILE:'I',LEU:'L',LYS:'K',MET:'M',PHE:'F',
    PRO:'P',SER:'S',THR:'T',TRP:'W',TYR:'Y',VAL:'V'
  };
  const three2full = {
    ALA:'Alanine',ARG:'Arginine',ASN:'Asparagine',ASP:'Aspartic acid',CYS:'Cysteine',
    GLN:'Glutamine',GLU:'Glutamic acid',GLY:'Glycine',HIS:'Histidine',ILE:'Isoleucine',
    LEU:'Leucine',LYS:'Lysine',MET:'Methionine',PHE:'Phenylalanine',PRO:'Proline',
    SER:'Serine',THR:'Threonine',TRP:'Tryptophan',TYR:'Tyrosine',VAL:'Valine'
  };

  const chainResidues = {};
  chains.forEach(ch => {
    const res = [...residues.values()]
      .filter(r=>r.chainId===ch)
      .sort((a,b)=>a.resSeq-b.resSeq);
    chainResidues[ch] = res.map(r=>({
      seq: r.resSeq,
      name3: r.resName,
      name1: three2one[r.resName]||'X',
      nameFull: three2full[r.resName]||r.resName,
      bFactor: r.bFactor,
      atomCount: r.atoms.length
    }));
  });

  return {
    proteinName: proteinName || 'Unknown Protein',
    organism,
    chains: [...chains].sort(),
    chainResidues,
    totalAtoms: atoms.length,
    totalResidues: [...residues.values()].filter(r=>['ALA','ARG','ASN','ASP','CYS','GLN','GLU','GLY','HIS','ILE','LEU','LYS','MET','PHE','PRO','SER','THR','TRP','TYR','VAL'].includes(r.resName)).length,
    caAtoms: atoms,
  };
};

// ─── PSSM GENERATOR ───────────────────────────────────────────
const generatePSSM = (sequences) => {
  if (!sequences.length) return null;
  const cleaned = sequences.map(s => s.replace(/-/g,'').toUpperCase());
  const minLen = Math.min(...cleaned.map(s=>s.length), 30);
  const positions = [];

  for (let pos = 0; pos < minLen; pos++) {
    const counts = {};
    AA_LETTERS.forEach(aa => counts[aa] = 0);
    cleaned.forEach(seq => {
      if (seq[pos]) counts[seq[pos]] = (counts[seq[pos]]||0) + 1;
    });
    const total = cleaned.length;
    const pseudocount = 0.5;
    const scores = {};
    AA_LETTERS.forEach(aa => {
      const freq = (counts[aa] + pseudocount) / (total + pseudocount * 20);
      const bgFreq = 0.05;
      scores[aa] = Math.round(Math.log2(freq / bgFreq) * 2) / 2;
    });
    const dominantAA = AA_LETTERS.reduce((best,aa)=>counts[aa]>counts[best]?aa:best,'A');
    positions.push({ pos: pos+1, counts, scores, dominantAA, total });
  }
  return positions;
};

// ─── HMM BUILDER ──────────────────────────────────────────────
const buildHMM = (sequences) => {
  if (!sequences.length) return null;
  const gapThreshold = 0.35;
  const aligned = sequences;
  const maxLen = Math.max(...aligned.map(s=>s.length));

  const matchCols = [];
  for (let col = 0; col < Math.min(maxLen, 20); col++) {
    const gapCount = aligned.filter(s => !s[col] || s[col]==='-').length;
    const gapFrac = gapCount / aligned.length;
    if (gapFrac < gapThreshold) matchCols.push(col);
  }

  const states = matchCols.slice(0, 10).map((col, idx) => {
    const emissions = {};
    AA_LETTERS.forEach(aa => emissions[aa] = 0);
    let total = 0;
    aligned.forEach(seq => {
      const c = seq[col]?.toUpperCase();
      if (c && c !== '-' && AA_LETTERS.includes(c)) { emissions[c]++; total++; }
    });
    AA_LETTERS.forEach(aa => emissions[aa] = total ? ((emissions[aa]+0.1)/(total+0.1*20)) : 1/20);
    const topAA = AA_LETTERS.reduce((b,aa)=>emissions[aa]>emissions[b]?aa:b,'A');
    return { idx: idx+1, col, emissions, topAA, total };
  });

  const transitions = states.map((s, i) => {
    let nMI=0, nMM=0, nMD=0, nIM=0, nII=0;
    aligned.forEach(seq => {
      const cur = seq[s.col]?.toUpperCase();
      const nxt = i<states.length-1 ? seq[states[i+1].col]?.toUpperCase() : undefined;
      if (!cur || cur==='-') return;
      if (!nxt || nxt==='-') nMD++;
      else { nMM++; if(Math.random()<0.15) nMI++; }
      if(Math.random()<0.1) nII++;
      nIM++;
    });
    const tot = nMM+nMI+nMD+1;
    return {
      'M→M': (nMM/tot).toFixed(3),
      'M→I': (nMI/tot).toFixed(3),
      'M→D': (nMD/tot).toFixed(3),
      'I→M': (0.6).toFixed(3),
      'I→I': (0.4).toFixed(3),
      'D→M': (0.9).toFixed(3),
      'D→D': (0.1).toFixed(3),
    };
  });

  return { states, transitions, matchCols, gapThreshold, numSeqs: aligned.length };
};

// ─── VITERBI ALGORITHM ────────────────────────────────────────
const viterbi = (sequence, hmm) => {
  if (!hmm || !sequence.length) return null;
  const seq = sequence.toUpperCase().split('').filter(c=>AA_LETTERS.includes(c));
  const n = seq.length;
  const m = hmm.states.length;
  if (!n || !m) return null;

  const V = Array.from({length:n}, ()=>Array(m).fill(-Infinity));
  const backtrack = Array.from({length:n}, ()=>Array(m).fill(-1));

  hmm.states.forEach((state, j) => {
    const emitP = Math.log((state.emissions[seq[0]]||0.001));
    V[0][j] = emitP;
  });

  for (let i=1; i<n; i++) {
    for (let j=0; j<m; j++) {
      const emitP = Math.log((hmm.states[j].emissions[seq[i]]||0.001));
      let best = -Infinity, bestPrev = 0;
      for (let k=0; k<m; k++) {
        const trans = k===j ? Math.log(0.1) : Math.log(0.9/(m-1||1));
        const val = V[i-1][k] + trans;
        if (val > best) { best=val; bestPrev=k; }
      }
      V[i][j] = best + emitP;
      backtrack[i][j] = bestPrev;
    }
  }

  let path = [];
  let lastState = V[n-1].indexOf(Math.max(...V[n-1]));
  for (let i=n-1; i>=0; i--) {
    path.unshift({ pos:i+1, aa:seq[i], state:lastState+1, logP: V[i][lastState].toFixed(2) });
    if (i>0) lastState = backtrack[i][lastState];
  }

  const totalLogP = Math.max(...V[n-1]);
  return { path, totalLogP: totalLogP.toFixed(2), seq };
};

// ─── SEQUENCE ALIGNMENT (Smith-Waterman local) ────────────────
const smithWaterman = (seq1, seq2) => {
  const s1 = seq1.toUpperCase().split('');
  const s2 = seq2.toUpperCase().split('');
  const m = s1.length, n = s2.length;
  const gapPenalty = -2;
  const H = Array.from({length:m+1},()=>Array(n+1).fill(0));
  const bt = Array.from({length:m+1},()=>Array(n+1).fill(0));
  let maxScore=0, maxI=0, maxJ=0;

  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      const match = (BLOSUM62[s1[i-1]]?.[s2[j-1]] ?? (s1[i-1]===s2[j-1]?2:-1));
      const diag = H[i-1][j-1]+match;
      const up   = H[i-1][j]+gapPenalty;
      const left = H[i][j-1]+gapPenalty;
      H[i][j]=Math.max(0,diag,up,left);
      if(H[i][j]===diag) bt[i][j]=1;
      else if(H[i][j]===up) bt[i][j]=2;
      else if(H[i][j]===left) bt[i][j]=3;
      if(H[i][j]>maxScore){maxScore=H[i][j];maxI=i;maxJ=j;}
    }
  }

  let align1='',align2='',matchStr='';
  let i=maxI,j=maxJ;
  while(i>0&&j>0&&H[i][j]>0){
    if(bt[i][j]===1){align1=s1[i-1]+align1;align2=s2[j-1]+align2;matchStr=(s1[i-1]===s2[j-1]?'|':':')+matchStr;i--;j--;}
    else if(bt[i][j]===2){align1=s1[i-1]+align1;align2='-'+align2;matchStr=' '+matchStr;i--;}
    else{align1='-'+align1;align2=s2[j-1]+align2;matchStr=' '+matchStr;j--;}
  }

  const identity = [...matchStr].filter(c=>c==='|').length / (align1.length||1) * 100;
  return { align1, align2, matchStr, score:maxScore, identity:identity.toFixed(1), matrix:H };
};

// Needleman-Wunsch global alignment
const needlemanWunsch = (seq1, seq2) => {
  const s1=seq1.toUpperCase().split('');
  const s2=seq2.toUpperCase().split('');
  const m=s1.length,n=s2.length;
  const gapPenalty=-2;
  const H=Array.from({length:m+1},(_,i)=>[...Array(n+1)].map((_,j)=>i===0?j*gapPenalty:j===0?i*gapPenalty:0));

  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++){
    const match=(BLOSUM62[s1[i-1]]?.[s2[j-1]]??(s1[i-1]===s2[j-1]?2:-1));
    H[i][j]=Math.max(H[i-1][j-1]+match,H[i-1][j]+gapPenalty,H[i][j-1]+gapPenalty);
  }
  let align1='',align2='',matchStr='',i=m,j=n;
  while(i>0||j>0){
    if(i>0&&j>0&&H[i][j]===(H[i-1][j-1]+(BLOSUM62[s1[i-1]]?.[s2[j-1]]??(s1[i-1]===s2[j-1]?2:-1)))){
      align1=s1[i-1]+align1;align2=s2[j-1]+align2;matchStr=(s1[i-1]===s2[j-1]?'|':':')+matchStr;i--;j--;
    }else if(i>0&&H[i][j]===H[i-1][j]+gapPenalty){align1=s1[i-1]+align1;align2='-'+align2;matchStr=' '+matchStr;i--;}
    else{align1='-'+align1;align2=s2[j-1]+align2;matchStr=' '+matchStr;j--;}
  }
  const identity=[...matchStr].filter(c=>c==='|').length/(align1.length||1)*100;
  return{align1,align2,matchStr,score:H[m][n],identity:identity.toFixed(1)};
};

// ═══════════════════════════════════════════════════════════════
//  COLOR TOKENS (kept in sync with BioAnalyzer.css)
// ═══════════════════════════════════════════════════════════════

const C = {
  bg: '#060a12',
  mint: '#21e0b0',
  mintDim: '#12b28a',
  violet: '#9b7bf0',
  violetDim: '#7c5ce0',
  amber: '#f5b544',
  coral: '#f2596b',
  azure: '#3ec7e0',
  textMute: '#667389',
};

const GROUP_BORDER_COLOR = {
  Nonpolar: C.mint,
  Polar: C.violet,
  Aromatic: C.amber,
  Acidic: C.coral,
  Basic: C.azure,
};

// ═══════════════════════════════════════════════════════════════
//  SVG COMPONENTS
// ═══════════════════════════════════════════════════════════════

const ProfileChart = ({values,stroke=C.mint,label='',yMin,yMax,refVal})=>{
  if(!values.length) return null;
  const W=Math.max(600,values.length*8),H=130,pad=10;
  const lo=yMin!==undefined?yMin:Math.min(...values);
  const hi=yMax!==undefined?yMax:Math.max(...values);
  const range=hi-lo||1;
  const toX=i=>pad+(i/(values.length-1||1))*(W-pad*2);
  const toY=v=>H-pad-((v-lo)/range)*(H-pad*2);
  const pts=values.map((v,i)=>`${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
  return(
    <div style={{overflowX:'auto',marginBottom:16}}>
      <svg width={W} height={H} style={{display:'block'}}>
        <rect width={W} height={H} fill={C.bg} rx="6"/>
        {refVal!==undefined&&(
          <>
            <line x1={pad} y1={toY(refVal)} x2={W-pad} y2={toY(refVal)} stroke="#ffffff20" strokeWidth="1" strokeDasharray="4,4"/>
            <text x={pad+2} y={toY(refVal)-3} fill="#ffffff60" fontSize={9}>{refVal}</text>
          </>
        )}
        <polyline points={pts} fill="none" stroke={stroke} strokeWidth="2"/>
        {label&&<text x={pad} y={H-2} fill="#ffffff60" fontSize={9}>{label}</text>}
      </svg>
    </div>
  );
};

const ProteinFoldingDiagram = ()=>(
  <svg viewBox="0 0 900 200" width="100%" style={{maxWidth:900,display:'block',margin:'0 auto'}}>
    {[
      {x:10,label:'Primary',sub:'AA sequence',color:C.mint,textColor:C.mint},
      {x:200,label:'Secondary',sub:'α-Helix / β-Sheet',color:C.violet,textColor:'#c3b3f7'},
      {x:390,label:'Tertiary',sub:'3D polypeptide',color:C.amber,textColor:'#f8c876'},
      {x:580,label:'Quaternary',sub:'Multiple chains',color:C.coral,textColor:'#f68a97'},
    ].map((s,idx)=>(
      <g key={idx}>
        <rect x={s.x} y="60" width="160" height="80" rx="8" fill="#0d1117" stroke={s.color} strokeWidth="2"/>
        <text x={s.x+80} y="48" textAnchor="middle" fontSize="11" fontWeight="bold" fill={s.textColor}>{s.label}</text>
        <text x={s.x+80} y="60" textAnchor="middle" fontSize="9" fill="#888">{s.sub}</text>
        {idx<3&&<text x={s.x+172} y="103" fontSize="18" fill={s.color}>→</text>}
      </g>
    ))}
    {['A','G','V','M','C','T'].map((l,i)=>(
      <g key={i}>
        <circle cx={25+i*22} cy={100} r="9" fill={C.mint}/>
        <text x={25+i*22} y={104} textAnchor="middle" fontSize="8" fill="#04140f" fontWeight="bold">{l}</text>
        {i<5&&<line x1={34+i*22} y1={100} x2={38+i*22} y2={100} stroke={C.mint} strokeWidth="2"/>}
      </g>
    ))}
    {[0,1,2,3,4,5].map(i=>(
      <path key={i} d={`M${210+i*19},${105} Q${219+i*19},${88} ${228+i*19},${105}`} fill="none" stroke={C.violet} strokeWidth="2.5"/>
    ))}
    <path d="M405,100 C420,80 440,120 460,90 S490,110 510,100 S530,80 540,105" fill="none" stroke={C.amber} strokeWidth="3"/>
    <circle cx="640" cy="100" r="17" fill={C.coral+'40'} stroke={C.coral} strokeWidth="2"/>
    <circle cx="668" cy="100" r="17" fill={C.violet+'40'} stroke={C.violet} strokeWidth="2"/>
    <circle cx="654" cy="84" r="13" fill={C.mint+'40'} stroke={C.mint} strokeWidth="2"/>
    <rect x="775" y="75" width="115" height="50" rx="8" fill={C.mint+'20'} stroke={C.mint} strokeWidth="2"/>
    <text x="832" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C.mint}>Function!</text>
    <text x="832" y="112" textAnchor="middle" fontSize="9" fill="#888">Biological activity</text>
    <text x="762" y="103" fontSize="18" fill={C.mint}>→</text>
  </svg>
);

const AlphaFoldDiagram = ()=>(
  <svg viewBox="0 0 960 160" width="100%" style={{maxWidth:960,display:'block',margin:'0 auto'}}>
    {[
      {x:5,w:110,label:'Input',sub:'AA Sequence',color:C.mint},
      {x:140,w:120,label:'MSA Stage',sub:'JackHMMER/HHBlits',color:C.violet},
      {x:285,w:110,label:'Pair Embed',sub:'MSA stats',color:C.amber},
      {x:420,w:130,label:'Evoformer',sub:'48 blocks',color:C.coral},
      {x:575,w:130,label:'Structure Module',sub:'8 blocks → φ,ψ',color:C.violet},
      {x:730,w:120,label:'3D Output',sub:'pLDDT + PAE',color:C.mint},
    ].map((s,i)=>(
      <g key={i}>
        <rect x={s.x} y="40" width={s.w} height="80" rx="8" fill="#0d1117" stroke={s.color} strokeWidth="2"/>
        <text x={s.x+s.w/2} y="66" textAnchor="middle" fontSize="10" fontWeight="bold" fill={s.color}>{s.label}</text>
        <text x={s.x+s.w/2} y="80" textAnchor="middle" fontSize="8" fill="#888">{s.sub}</text>
        {i<5&&<text x={s.x+s.w+4} y="83" fontSize="16" fill={s.color}>→</text>}
      </g>
    ))}
    <path d="M850,130 Q850,150 490,150 Q140,150 140,130" fill="none" stroke="#ffffff30" strokeWidth="1.5" strokeDasharray="5,4"/>
    <text x="490" y="148" textAnchor="middle" fontSize="9" fill="#ffffff60">← Recycling (3×)</text>
  </svg>
);

const HMMDiagram = ({states})=>{
  const n=Math.min(states||4,6);
  const labels=Array.from({length:n},(_,i)=>String.fromCharCode(65+i));
  return(
    <svg viewBox={`0 0 ${120+n*110} 220`} width="100%" style={{minWidth:400,display:'block',margin:'0 auto'}}>
      <rect x="8" y="83" width="46" height="28" rx="6" fill={C.mint} stroke={C.mintDim} strokeWidth="2"/>
      <text x="31" y="101" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#04140f">S</text>
      <line x1="54" y1="97" x2="74" y2="97" stroke={C.mint} strokeWidth="2" markerEnd="url(#arr-hmm)"/>
      {labels.map((l,i)=>{
        const bx=74+i*110;
        return(
          <g key={i}>
            <circle cx={bx+20} cy={32} r="16" fill="#1a1a2e" stroke="#888" strokeWidth="1.5"/>
            <text x={bx+20} y={36} textAnchor="middle" fontSize="9" fill={C.coral}>D{i+1}</text>
            <line x1={bx+20} y1="48" x2={bx+20} y2="83" stroke="#888" strokeWidth="1.2" strokeDasharray="4,3"/>
            <rect x={bx} y="83" width="45" height="28" rx="5" fill={C.violet} stroke={C.violetDim} strokeWidth="2"/>
            <text x={bx+22} y="97" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">M{i+1}</text>
            <text x={bx+22} y="108" textAnchor="middle" fontSize="8" fill="#e4dbfb">{l}</text>
            {i<n-1&&(
              <>
                <polygon points={`${bx+56},150 ${bx+67},163 ${bx+56},176 ${bx+45},163`} fill={C.amber} stroke="#d99a2b" strokeWidth="1.5"/>
                <text x={bx+56} y={167} textAnchor="middle" fontSize="8" fill="#04140f" fontWeight="bold">I{i+1}</text>
                <line x1={bx+45} y1="97" x2={bx+65} y2="97" stroke={C.mint} strokeWidth="2" markerEnd="url(#arr-hmm)"/>
              </>
            )}
          </g>
        );
      })}
      <rect x={74+n*110} y="83" width="46" height="28" rx="6" fill={C.mint} stroke={C.mintDim} strokeWidth="2"/>
      <text x={74+n*110+23} y="101" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#04140f">E</text>
      <defs>
        <marker id="arr-hmm" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill={C.mint}/>
        </marker>
      </defs>
    </svg>
  );
};

const ContactMap = ({aaSeq})=>{
  const n=Math.min(aaSeq.length,18);if(n<3)return null;
  const sub=aaSeq.slice(0,n),sz=15,pad=30,dim=n*sz+pad*2;
  return(
    <div style={{overflowX:'auto',textAlign:'center'}}>
      <svg width={dim} height={dim}>
        <rect width={dim} height={dim} fill={C.bg} rx="8"/>
        {sub.map((aa,i)=>(
          <g key={i}>
            <text x={pad+i*sz+sz/2} y={pad-4} textAnchor="middle" fontSize="7" fill="#888">{singleLetter[aa]||'?'}</text>
            <text x={pad-4} y={pad+i*sz+sz/2+3} textAnchor="end" fontSize="7" fill="#888">{singleLetter[aa]||'?'}</text>
          </g>
        ))}
        {sub.map((aa,i)=>sub.map((bb,j)=>{
          const hi=hydrophobicity[aa]||0,hj=hydrophobicity[bb]||0;
          const score=i===j?1:Math.max(0,Math.min(1,(hi*hj+5)/20+(Math.abs(i-j)<=3?0.5:0)));
          const col=i===j?C.mint:score>0.6?`rgba(33,224,176,${score.toFixed(2)})`:`rgba(255,255,255,0.03)`;
          return<rect key={`${i}-${j}`} x={pad+j*sz} y={pad+i*sz} width={sz} height={sz} fill={col} stroke="#ffffff08" strokeWidth="0.5"/>;
        }))}
      </svg>
    </div>
  );
};

const PSSMChart = ({pssm})=>{
  if(!pssm||!pssm.length) return null;
  const displayAAs=['A','C','D','E','F','G','H','I','K','L','M','N','P','Q','R','S','T','V','W','Y'];
  const cellW=Math.max(20,Math.floor(560/pssm.length));
  const cellH=16;
  const W=pssm.length*cellW+80,H=displayAAs.length*cellH+50;
  const scoreColor=v=>{
    if(v>=2)return`rgba(33,224,176,${Math.min(1,v/4)})`;
    if(v>=0)return`rgba(100,110,210,${Math.min(0.6,v/2+0.1)})`;
    return`rgba(242,89,107,${Math.min(0.8,Math.abs(v)/4)})`;
  };
  return(
    <div style={{overflowX:'auto'}}>
      <svg width={W} height={H} style={{display:'block'}}>
        <rect width={W} height={H} fill={C.bg} rx="8"/>
        {displayAAs.map((aa,ai)=>(
          <text key={aa} x={28} y={35+ai*cellH+cellH*0.7} textAnchor="end" fontSize="9" fill="#aaa" fontWeight="bold">{aa}</text>
        ))}
        {pssm.map((pos,pi)=>(
          <g key={pi}>
            <text x={40+pi*cellW+cellW/2} y={18} textAnchor="middle" fontSize="8" fill="#666">{pos.pos}</text>
            <text x={40+pi*cellW+cellW/2} y={28} textAnchor="middle" fontSize="9" fill={C.mint} fontWeight="bold">{pos.dominantAA}</text>
            {displayAAs.map((aa,ai)=>{
              const v=pos.scores[aa]||0;
              return(
                <g key={aa}>
                  <rect x={40+pi*cellW} y={35+ai*cellH} width={cellW-1} height={cellH-1} fill={scoreColor(v)} rx="1"/>
                  {cellW>22&&<text x={40+pi*cellW+cellW/2} y={35+ai*cellH+cellH*0.72} textAnchor="middle" fontSize="7" fill={Math.abs(v)>1?'white':'#888'}>{v>0?'+':''}{v.toFixed(1)}</text>}
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
};

const Protein3DView = ({aaSeq})=>{
  if(aaSeq.length<3) return null;
  const n=Math.min(aaSeq.length,30),sub=aaSeq.slice(0,n);
  const coords=sub.map((aa,i)=>{
    const t=i/(n-1||1),isHelix=hydrophobicity[aa]>0,r=isHelix?30:18,turns=2.5;
    return{x:250+r*Math.cos(i*turns*2*Math.PI/n)+(1-t)*30,y:60+t*200+r*0.4*Math.sin(i*turns*2*Math.PI/n+Math.PI/4),z:r*Math.sin(i*turns*2*Math.PI/n),aa};
  });
  const sorted=[...coords].sort((a,b)=>a.z-b.z);
  const groupCol=GROUP_BORDER_COLOR;
  return(
    <svg viewBox="0 0 500 310" width="100%" style={{maxWidth:500,background:C.bg,borderRadius:12,display:'block',margin:'0 auto'}}>
      {coords.slice(0,-1).map((p,i)=>{
        const q=coords[i+1],thick=2+(p.z+40)/25,col=groupCol[aaGroups[p.aa]]||C.mint;
        return<line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={col} strokeWidth={thick} strokeLinecap="round" opacity={0.7+p.z/120}/>;
      })}
      {sorted.map((p,i)=>{
        const r=5+p.z/20,col=groupCol[aaGroups[p.aa]]||C.mint;
        return<g key={i}><circle cx={p.x} cy={p.y} r={r} fill={col} stroke="#ffffff20" strokeWidth="1" opacity={0.8+p.z/120}/><text x={p.x} y={p.y+3} textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">{singleLetter[p.aa]||'?'}</text></g>;
      })}
      {Object.entries(groupCol).map(([g,c],i)=>(
        <g key={g} transform={`translate(10,${i*18+10})`}><circle cx="6" cy="7" r="5" fill={c}/><text x="14" y="11" fontSize="8" fill="#aaa">{g}</text></g>
      ))}
      <rect x={coords[0].x-12} y={coords[0].y-18} width="24" height="13" rx="4" fill={C.mint}/>
      <text x={coords[0].x} y={coords[0].y-9} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#04140f">N</text>
      <rect x={coords[n-1].x-12} y={coords[n-1].y+7} width="24" height="13" rx="4" fill={C.coral}/>
      <text x={coords[n-1].x} y={coords[n-1].y+18} textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">C</text>
      <text x="250" y="298" textAnchor="middle" fontSize="9" fill="#555">First {n} residues · N→C direction</text>
    </svg>
  );
};

const PLDDTBar = ({aaSeq})=>{
  if(!aaSeq.length) return null;
  const scores=aaSeq.map((aa,i)=>{
    const h=Math.abs(hydrophobicity[aa]||0),b=bulkiness[aa]||15,f=flexibility[aa]||0.4;
    return Math.min(100,Math.max(20,50+h*5+b*1.2-f*20+Math.sin(i*0.7)*8));
  });
  const avg=(scores.reduce((s,v)=>s+v,0)/scores.length).toFixed(1);
  const n=Math.min(scores.length,40),W=Math.max(500,n*18);
  const cc=v=>v>=90?'#4f8ff0':v>=70?'#3ecf7e':v>=50?C.amber:C.coral;
  return(
    <>
      <div className="ba-card" style={{padding:'8px 12px',marginBottom:8,fontSize:13,color:'#aaa'}}>
        Average pLDDT: <strong style={{color:C.mint}}>{avg}</strong>
        {[['≥90 Very high','#4f8ff0'],['70-90 High','#3ecf7e'],['50-70 Low',C.amber],['<50 Very low',C.coral]].map(([l,c])=>(
          <span key={l} style={{marginLeft:12}}><span style={{display:'inline-block',width:10,height:10,background:c,borderRadius:2,marginRight:4,verticalAlign:'middle'}}/>
          <span style={{fontSize:11}}>{l}</span></span>
        ))}
      </div>
      <div style={{overflowX:'auto'}}>
        <svg width={W} height={120}>
          <rect width={W} height={120} fill={C.bg} rx="8"/>
          {[[90,100,'#4f8ff010'],[70,90,'#3ecf7e10'],[50,70,C.amber+'10'],[0,50,C.coral+'10']].map(([lo,hi,col])=>(
            <rect key={lo} x={10} y={10+(100-hi)} width={W-20} height={hi-lo} fill={col}/>
          ))}
          {scores.slice(0,n).map((v,i)=>(
            <g key={i}>
              <rect x={10+i*Math.floor((W-20)/n)} y={10+(100-v)} width={Math.max(4,Math.floor((W-20)/n)-2)} height={v} fill={cc(v)} rx="2" opacity="0.85"/>
              {i%5===0&&<text x={12+i*Math.floor((W-20)/n)} y={118} fontSize="8" fill="#555">{singleLetter[aaSeq[i]]||'?'}{i+1}</text>}
            </g>
          ))}
          {[90,70,50].map(v=>(
            <line key={v} x1={10} y1={10+(100-v)} x2={W-10} y2={10+(100-v)} stroke={cc(v)} strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
          ))}
        </svg>
      </div>
    </>
  );
};

const PDBViewer = ({pdbData})=>{
  const [selChain,setSelChain]=useState('');
  if(!pdbData) return null;
  const chain=selChain||pdbData.chains[0]||'';
  const residues=pdbData.chainResidues[chain]||[];
  const groupColor=GROUP_BORDER_COLOR;

  return(
    <div>
      <div className="ba-grid-4" style={{marginBottom:16}}>
        {[
          {label:'Protein',value:pdbData.proteinName.substring(0,30)+(pdbData.proteinName.length>30?'...':'')},
          {label:'Chains',value:pdbData.chains.join(', ')||'—'},
          {label:'Total Residues',value:pdbData.totalResidues},
          {label:'Total Atoms',value:pdbData.totalAtoms},
        ].map(s=>(
          <div key={s.label} className="ba-stat-card">
            <div className="ba-stat-label">{s.label}</div>
            <div className="ba-stat-val">{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap'}}>
        {pdbData.chains.map(ch=>{
          const active = selChain===ch||(!selChain&&ch===pdbData.chains[0]);
          return(
            <button key={ch} onClick={()=>setSelChain(ch)} className={`ba-btn-tab${active?' active':''}`}>
              Chain {ch} ({pdbData.chainResidues[ch]?.length||0} res)
            </button>
          );
        })}
      </div>

      {residues.length>0&&(
        <>
          <div style={{marginBottom:12}}>
            <h3 style={{fontSize:13,color:C.mint,marginBottom:8}}>Residue Sequence (Chain {chain})</h3>
            <div style={{background:C.bg,borderRadius:8,padding:12,fontFamily:'monospace',fontSize:12,lineHeight:2.2,overflowX:'auto'}}>
              {residues.map((r,i)=>{
                const grp=aaGroups[r.nameFull]||'Nonpolar';
                return(
                  <span key={i} title={`${r.resSeq}: ${r.nameFull}`}
                    style={{display:'inline-block',margin:'1px',padding:'2px 5px',borderRadius:4,
                      background:groupColor[grp]+'25',border:`1px solid ${groupColor[grp]}50`,
                      color:groupColor[grp],fontSize:10,cursor:'default'}}>
                    {r.name1}<sub style={{fontSize:7}}>{r.resSeq}</sub>
                  </span>
                );
              })}
            </div>
          </div>

          <h3 style={{fontSize:13,color:C.mint,marginBottom:8}}>Amino Acid Statistics (Chain {chain})</h3>
          {(()=>{
            const cnts={};
            residues.forEach(r=>{const n=r.nameFull;cnts[n]=(cnts[n]||0)+1;});
            const total=residues.length;
            const groupCnts={Nonpolar:0,Polar:0,Aromatic:0,Acidic:0,Basic:0};
            Object.entries(cnts).forEach(([aa,c])=>{const g=aaGroups[aa]||'Nonpolar';groupCnts[g]+=c;});
            return(
              <>
                <div className="ba-grid-5" style={{marginBottom:12}}>
                  {Object.entries(groupCnts).map(([g,c])=>(
                    <div key={g} style={{background:C.bg,borderRadius:8,padding:'8px 10px',border:`1px solid ${groupColor[g]}40`,textAlign:'center'}}>
                      <div style={{fontSize:9,color:groupColor[g]}}>{g}</div>
                      <div style={{fontSize:16,fontWeight:700,color:groupColor[g]}}>{c}</div>
                      <div style={{fontSize:9,color:'#555'}}>{total?((c/total)*100).toFixed(1):0}%</div>
                    </div>
                  ))}
                </div>
                <div style={{maxHeight:280,overflowY:'auto'}}>
                  <table className="ba-table">
                    <thead>
                      <tr>
                        {['Amino Acid','3-Letter','1-Letter','Group','Count','%'].map(h=>(
                          <th key={h} className="ba-th">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(cnts).sort((a,b)=>b[1]-a[1]).map(([aa,c])=>{
                        const g=aaGroups[aa]||'Nonpolar';
                        return(
                          <tr key={aa}>
                            <td className="ba-td">{aa}</td>
                            <td className="ba-td" style={{fontFamily:'monospace'}}>{threeLetter[aa]||'—'}</td>
                            <td className="ba-td" style={{color:groupColor[g],fontFamily:'monospace',fontWeight:700}}>{singleLetter[aa]||'—'}</td>
                            <td className="ba-td"><span style={{background:groupColor[g]+'25',color:groupColor[g],padding:'2px 7px',borderRadius:4,fontSize:10}}>{g}</span></td>
                            <td className="ba-td" style={{color:C.mint,fontWeight:700}}>{c}</td>
                            <td className="ba-td" style={{color:'#555'}}>{total?((c/total)*100).toFixed(1):0}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function BioAnalyzer() {
  const [sequence, setSequence]           = useState('');
  const [analyzed, setAnalyzed]           = useState(false);
  const [mainTab, setMainTab]             = useState('nucleotide');
  const [proteinTab, setProteinTab]       = useState('summary');
  const [structureTab, setStructureTab]   = useState('folding');
  const [toolTab, setToolTab]             = useState('pssm');
  const [proteinData, setProteinData]     = useState({aaSeq:[],codons:[]});
  const [qualityScores, setQualityScores] = useState('');
  const [pdbData, setPdbData]             = useState(null);
  const [pssm, setPssm]                   = useState(null);
  const [hmm, setHmm]                     = useState(null);
  const [viterbiResult, setViterbiResult] = useState(null);
  const [msaInput, setMsaInput]           = useState('');
  const [alignSeq1, setAlignSeq1]         = useState('');
  const [alignSeq2, setAlignSeq2]         = useState('');
  const [alignMethod, setAlignMethod]     = useState('local');
  const [alignResult, setAlignResult]     = useState(null);
  const [viterbiSeq, setViterbiSeq]       = useState('');

  const handleAnalyze = () => {
    if(!sequence.trim()){alert('Please enter a DNA, RNA, or protein sequence.');return;}
    const upper=sequence.toUpperCase().trim();
    const isProtein = !upper.split('').every(c=>'ATCGU\n\r '.includes(c));
    if(isProtein){
      const aaSeq=upper.split('').filter(c=>Object.values(singleLetter).includes(c))
        .map(c=>Object.keys(singleLetter).find(k=>singleLetter[k]===c)).filter(Boolean);
      setProteinData({aaSeq,codons:[]});
    } else {
      const rna=upper.includes('U')?upper:convertDNAToRNA(upper);
      const{codons,aaSeq}=parseProtein(rna);
      setProteinData({codons,aaSeq});
    }
    setAnalyzed(true);
    setMainTab('nucleotide');
    setProteinTab('summary');
    setStructureTab('folding');
  };

  const generateRandom = type => {
    const bases=type==='DNA'?['A','T','C','G']:['A','U','C','G'];
    const start=type==='DNA'?'ATG':'AUG';
    const stop=type==='DNA'?'TAA':'UAA';
    let seq=start;
    for(let i=0;i<60;i++) seq+=bases[Math.floor(Math.random()*4)];
    setSequence(seq+stop);setAnalyzed(false);
  };

  const handleFileUpload = e => {
    const file=e.target.files[0];if(!file)return;
    const ext=file.name.split('.').pop().toLowerCase();
    const reader=new FileReader();
    reader.onload=()=>{
      if(ext==='pdb'){
        setPdbData(parsePDB(reader.result));
        setMainTab('pdb');
      } else if(ext==='fa'||ext==='fasta'){
        const{sequence:seq}=extractFASTA(reader.result);
        setSequence(seq);setAnalyzed(false);
      } else if(ext==='fastq'||ext==='fq'){
        const{sequence:seq,qualityScores:qs}=extractFASTQ(reader.result);
        setSequence(seq);setQualityScores(qs);setAnalyzed(false);
      }
    };
    reader.readAsText(file);
  };

  const handleBuildPSSM = () => {
    const seqs=msaInput.split('\n').map(s=>s.trim().toUpperCase()).filter(s=>s.length>2&&!s.startsWith('>'));
    if(!seqs.length&&sequence){seqs.push(sequence);}
    if(!seqs.length){alert('Enter sequences in the MSA box or analyze a sequence first.');return;}
    setPssm(generatePSSM(seqs));
    setHmm(buildHMM(seqs));
  };

  const handleViterbi = () => {
    const seq=viterbiSeq||sequence;
    if(!hmm){alert('Build PSSM/HMM first.');return;}
    const result=viterbi(seq,hmm);
    setViterbiResult(result);
  };

  const handleAlign = () => {
    if(!alignSeq1||!alignSeq2){alert('Enter both sequences.');return;}
    const result=alignMethod==='local'?smithWaterman(alignSeq1,alignSeq2):needlemanWunsch(alignSeq1,alignSeq2);
    setAlignResult(result);
  };

  // Derived values
  const counts={};
  proteinData.aaSeq.forEach(aa=>{counts[aa]=(counts[aa]||0)+1;});
  const totalAA=proteinData.aaSeq.length;
  const mw=totalAA?proteinData.aaSeq.reduce((s,aa)=>s+(aminoAcidMW[aa]||111),0)+18.02:0;
  const pi=totalAA?calcIsoelectricPoint(counts):'—';
  const gravy=totalAA?calcGRAVY(proteinData.aaSeq):'—';
  const extCoeff=totalAA?calcExtCoeff(counts):0;
  const instab=totalAA?calcInstability(proteinData.aaSeq):'—';
  const aliphat=totalAA?calcAliphaticIndex(counts,totalAA):'—';
  const flexAvg=totalAA?calcAvgFlexibility(proteinData.aaSeq):'—';
  const bulkAvg=totalAA?calcAvgBulkiness(proteinData.aaSeq):'—';
  const absCoeff=totalAA&&mw?(extCoeff/mw).toFixed(3):'—';
  const basic=(counts['Lysine']||0)+(counts['Arginine']||0)+(counts['Histidine']||0);
  const acidic=(counts['Aspartic acid']||0)+(counts['Glutamic acid']||0);
  const netCharge=basic-acidic;
  const cysCount=counts['Cysteine']||0;
  const disulfide=Math.floor(cysCount/2);
  const isRNA=sequence.includes('U');
  const rna=isRNA?sequence:(analyzed?convertDNAToRNA(sequence):'');
  const gc=analyzed?calculateGC(sequence).toFixed(2):0;
  const at=analyzed?calculateAT(sequence).toFixed(2):0;
  const ratio=analyzed&&parseFloat(gc)>0?(parseFloat(at)/parseFloat(gc)).toFixed(3):'—';
  const pct=analyzed?calcNucleotidePct(sequence):{A:0,T:0,C:0,G:0,U:0};
  const orfs=analyzed?findORFs(sequence):[];
  const nucs=isRNA?['A','U','C','G']:['A','T','C','G'];
  const singleLetterSeq=proteinData.aaSeq.map(a=>singleLetter[a]||'?').join('');
  const groupCounts={};
  proteinData.aaSeq.forEach(aa=>{const g=aaGroups[aa]||'Nonpolar';groupCounts[g]=(groupCounts[g]||0)+1;});
  const hydroProfile=proteinData.aaSeq.length>=9?(()=>{
    const W=9,vals=[];
    for(let i=0;i<=proteinData.aaSeq.length-W;i++){
      const win=proteinData.aaSeq.slice(i,i+W);
      vals.push(win.reduce((s,aa)=>s+(hydrophobicity[aa]||0),0)/W);
    }
    return vals;
  })():[];
  const flexProfile=proteinData.aaSeq.map(aa=>flexibility[aa]||0.4);
  const bulkProfile=proteinData.aaSeq.map(aa=>bulkiness[aa]||15);
  const groupColorMap=GROUP_BORDER_COLOR;

  const isNonNucleotide = sequence.trim() && !sequence.trim().toUpperCase().split('').every(c=>'ATCGU\n\r '.includes(c));

  const mainTabs=[
    {id:'nucleotide',label:'🧬 Nucleotide',hidden:isNonNucleotide},
    {id:'protein',   label:'🔬 Protein Analysis'},
    {id:'structure', label:'🏗️ 3D Structure'},
    {id:'orf',       label:'🔍 ORF Scanner',hidden:isNonNucleotide},
    {id:'tools',     label:'⚙️ Bio Tools'},
    {id:'pdb',       label:'🗂️ PDB Viewer'},
  ].filter(t=>!t.hidden||(t.id==='pdb'&&pdbData));

  const handleDownloadCSV = () => {
    const rows=[
      ['Parameter','Value'],
      ['Sequence Length',sequence.length],['Type',isRNA?'RNA':'DNA'],
      ['GC Content (%)',gc],['AT/AU Content (%)',at],['AT/GC Ratio',ratio],
      ['Melting Temperature',calcTm(sequence)],['Protein Length (AA)',totalAA],
      ['Protein (1-letter)',singleLetterSeq],['Molecular Weight (Da)',mw.toFixed(2)],
      ['Isoelectric Point',pi],['GRAVY Index',gravy],['Aliphatic Index',aliphat],
      ['Instability Index',instab],['Extinction Coeff',extCoeff],['Net Charge pH7',netCharge],
      ...Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([aa,n])=>[`AA:${aa}`,n]),
    ];
    const csv=rows.map(r=>r.join(',')).join('\n');
    const a=document.createElement('a');
    a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
    a.download='bio_analysis.csv';a.click();
  };

  return(
    <div className="ba-root">
      {/* ── NAVBAR ── */}
      <Allnavbar />

      <div className="ba-main">
        <div className="ba-header">
          <div className="ba-container">
            <div className="ba-title">🧬 BioAnalyzer Pro</div>
            <div className="ba-subtitle">DNA · RNA · Protein · PDB · PSSM · HMM · Viterbi · Sequence Alignment</div>
          </div>
        </div>

        <div className="ba-container">

          <div className="ba-card">
            <div style={{display:'flex',gap:16,alignItems:'flex-start',flexWrap:'wrap'}}>
              <div style={{flex:1,minWidth:280}}>
                <div className="ba-label">Enter DNA / RNA / Protein Sequence</div>
                <textarea
                  rows={7}
                  className="ba-textarea"
                  placeholder="Enter DNA, RNA, or Protein sequence...&#10;DNA: ATGGCCAAATTTGAG...&#10;RNA: AUGGCCAAAUUUGAG...&#10;Protein: MAVFK..."
                  value={sequence}
                  onChange={e=>{setSequence(e.target.value.toUpperCase().replace(/[^ATCGUACDEFGHIKLMNPQRSTVWY\n\r\s]/g,''));setAnalyzed(false);}}
                />
                <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
                  <button className="ba-btn ba-btn-primary" onClick={handleAnalyze}>▶ Analyze</button>
                  <button className="ba-btn ba-btn-secondary" onClick={handleDownloadCSV} disabled={!analyzed}>⬇ CSV</button>
                  <button className="ba-btn ba-btn-secondary" onClick={()=>generateRandom('DNA')}>🎲 Random DNA</button>
                  <button className="ba-btn ba-btn-secondary" onClick={()=>generateRandom('RNA')}>🎲 Random RNA</button>
                  <button className="ba-btn ba-btn-secondary" onClick={()=>{setSequence('');setAnalyzed(false);setPdbData(null);}}>✕ Clear</button>
                </div>
              </div>
              <div style={{minWidth:220}}>
                <div className="ba-label">Upload File</div>
                <div className="ba-upload-box">
                  <input type="file" accept=".fasta,.fa,.fastq,.fq,.pdb,.txt" onChange={handleFileUpload}
                    style={{position:'absolute',inset:0,opacity:0,cursor:'pointer',width:'100%'}}/>
                  <div style={{fontSize:24,marginBottom:4}}>📁</div>
                  <div style={{fontSize:11,color:C.textMute}}>FASTA · FASTQ · PDB</div>
                  <div style={{fontSize:10,color:'#3d4d5e',marginTop:4}}>Click or drag & drop</div>
                </div>
                {pdbData&&(
                  <div className="ba-alert ba-alert-mint" style={{marginTop:8}}>
                    ✓ PDB loaded: {pdbData.proteinName.substring(0,25)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {!analyzed && mainTab !== 'pdb' && (
            <div className="ba-card">
              <div className="ba-section-title">⚙️ Bio Tools</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
                {[{id:'pssm',label:'📊 PSSM'},{id:'hmm',label:'⚙️ HMM'},{id:'viterbi',label:'🔀 Viterbi'},{id:'alignment',label:'🔗 Alignment'}].map(t=>(
                  <button key={t.id} onClick={()=>setToolTab(t.id)} className={`ba-btn-tab${toolTab===t.id?' active':''}`}>
                    {t.label}
                  </button>
                ))}
              </div>
              {toolTab==='pssm'&&<ToolPSSM msaInput={msaInput} setMsaInput={setMsaInput} onBuild={handleBuildPSSM} pssm={pssm}/>}
              {toolTab==='hmm'&&<ToolHMM msaInput={msaInput} setMsaInput={setMsaInput} onBuild={handleBuildPSSM} hmm={hmm}/>}
              {toolTab==='viterbi'&&<ToolViterbi viterbiSeq={viterbiSeq} setViterbiSeq={setViterbiSeq} onRun={handleViterbi} result={viterbiResult} hmm={hmm}/>}
              {toolTab==='alignment'&&<ToolAlignment alignSeq1={alignSeq1} setAlignSeq1={setAlignSeq1}
                alignSeq2={alignSeq2} setAlignSeq2={setAlignSeq2}
                method={alignMethod} setMethod={setAlignMethod}
                onAlign={handleAlign} result={alignResult}/>}
            </div>
          )}

          {pdbData && !analyzed && (
            <div className="ba-card">
              <div className="ba-section-title">🗂️ PDB Structure Viewer</div>
              <PDBViewer pdbData={pdbData}/>
            </div>
          )}

          {analyzed && (
            <div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
                {mainTabs.map(t=>(
                  <button key={t.id} onClick={()=>setMainTab(t.id)} className={`ba-btn-tab${mainTab===t.id?' active':''}`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {mainTab==='nucleotide'&&(
                <NucleotideTab sequence={sequence} isRNA={isRNA} gc={gc} at={at} ratio={ratio}
                  pct={pct} nucs={nucs} rna={rna} qualityScores={qualityScores} orfs={orfs}/>
              )}

              {mainTab==='protein'&&(
                <div className="ba-card">
                  {totalAA===0?(
                    <div className="ba-alert ba-alert-warning">
                      ⚠ No protein detected. Sequence must start with ATG (DNA) or AUG (RNA), or enter a protein sequence directly.
                    </div>
                  ):(
                    <>
                      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
                        {[
                          {id:'summary',label:'Summary'},{id:'codons',label:'Codon Map'},
                          {id:'composition',label:'Composition'},{id:'hydro',label:'Hydrophobicity'},
                          {id:'groups',label:'Chemical Groups'},{id:'physical',label:'Physicochemical'},
                          {id:'profiles',label:'Profile Charts'},{id:'sequence',label:'AA Sequence'},
                          {id:'table',label:'Full Table'},
                        ].map(t=>(
                          <button key={t.id} onClick={()=>setProteinTab(t.id)}
                            className={`ba-btn-tab${proteinTab===t.id?' active-violet':''}`} style={{fontSize:11,padding:'5px 10px'}}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                      <ProteinTabs tab={proteinTab} proteinData={proteinData} counts={counts} totalAA={totalAA}
                        mw={mw} pi={pi} gravy={gravy} extCoeff={extCoeff} instab={instab} aliphat={aliphat}
                        flexAvg={flexAvg} bulkAvg={bulkAvg} absCoeff={absCoeff} basic={basic} acidic={acidic}
                        netCharge={netCharge} cysCount={cysCount} disulfide={disulfide} groupCounts={groupCounts}
                        singleLetterSeq={singleLetterSeq} hydroProfile={hydroProfile} flexProfile={flexProfile}
                        bulkProfile={bulkProfile} groupColorMap={groupColorMap}/>
                    </>
                  )}
                </div>
              )}

              {mainTab==='structure'&&(
                <div className="ba-card">
                  {totalAA===0?(
                    <div className="ba-alert ba-alert-warning">
                      ⚠ No protein detected. Sequence must start with ATG/AUG.
                    </div>
                  ):(
                    <>
                      <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
                        {[
                          {id:'folding',label:'🧲 Folding Levels'},{id:'alphafold',label:'🤖 AlphaFold'},
                          {id:'3d',label:'🔵 3D View'},{id:'plddt',label:'📊 pLDDT'},
                          {id:'contact',label:'🗺️ Contact Map'},{id:'hmm',label:'⚙️ HMM States'},
                        ].map(t=>(
                          <button key={t.id} onClick={()=>setStructureTab(t.id)}
                            className={`ba-btn-tab${structureTab===t.id?' active-coral':''}`} style={{fontSize:11,padding:'5px 10px'}}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                      <StructureTabs tab={structureTab} aaSeq={proteinData.aaSeq} counts={counts}
                        totalAA={totalAA} singleLetterSeq={singleLetterSeq} disulfide={disulfide}
                        gravy={gravy} netCharge={netCharge} pi={pi} instab={instab}/>
                    </>
                  )}
                </div>
              )}

              {mainTab==='orf'&&(
                <div className="ba-card">
                  <div className="ba-section-title">🔍 Open Reading Frames</div>
                  {orfs.length===0?(
                    <div className="ba-alert ba-alert-warning">
                      No complete ORFs found. Requires AUG start + in-frame stop codon.
                    </div>
                  ):(
                    <table className="ba-table">
                      <thead><tr>{['#','Start (nt)','End (nt)','Length (nt)','Codons','AA Length'].map(h=><th key={h} className="ba-th">{h}</th>)}</tr></thead>
                      <tbody>{orfs.map((orf,i)=>(
                        <tr key={i}>
                          <td className="ba-td">{i+1}</td>
                          <td className="ba-td" style={{fontFamily:'monospace',color:C.mint}}>{orf.start}</td>
                          <td className="ba-td" style={{fontFamily:'monospace',color:C.mint}}>{orf.end}</td>
                          <td className="ba-td">{orf.length}</td>
                          <td className="ba-td">{orf.codons}</td>
                          <td className="ba-td" style={{color:C.mint,fontWeight:700}}>{orf.codons-1}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  )}
                </div>
              )}

              {mainTab==='tools'&&(
                <div className="ba-card">
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
                    {[{id:'pssm',label:'📊 PSSM'},{id:'hmm',label:'⚙️ HMM'},{id:'viterbi',label:'🔀 Viterbi'},{id:'alignment',label:'🔗 Alignment'}].map(t=>(
                      <button key={t.id} onClick={()=>setToolTab(t.id)} className={`ba-btn-tab${toolTab===t.id?' active':''}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                  {toolTab==='pssm'&&<ToolPSSM msaInput={msaInput} setMsaInput={setMsaInput} onBuild={handleBuildPSSM} pssm={pssm}/>}
                  {toolTab==='hmm'&&<ToolHMM msaInput={msaInput} setMsaInput={setMsaInput} onBuild={handleBuildPSSM} hmm={hmm}/>}
                  {toolTab==='viterbi'&&<ToolViterbi viterbiSeq={viterbiSeq} setViterbiSeq={setViterbiSeq} onRun={handleViterbi} result={viterbiResult} hmm={hmm}/>}
                  {toolTab==='alignment'&&<ToolAlignment alignSeq1={alignSeq1} setAlignSeq1={setAlignSeq1}
                    alignSeq2={alignSeq2} setAlignSeq2={setAlignSeq2}
                    method={alignMethod} setMethod={setAlignMethod}
                    onAlign={handleAlign} result={alignResult}/>}
                </div>
              )}

              {mainTab==='pdb'&&(
                <div className="ba-card">
                  <div className="ba-section-title">🗂️ PDB Structure Viewer</div>
                  {pdbData?<PDBViewer pdbData={pdbData}/>:(
                    <div className="ba-alert ba-alert-neutral" style={{textAlign:'center',padding:32}}>
                      Upload a .pdb file to view structure data
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER (always the last thing on the page, no trailing gap) ── */}
      <div className="ba-footer-slot">
        <Allfooter />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

function NucleotideTab({sequence,isRNA,gc,at,ratio,pct,nucs,rna,qualityScores}){
  return(
    <div className="ba-card">
      <div className="ba-section-title">🧬 Nucleotide Analysis</div>
      <div className="ba-stat-grid">
        {[
          {label:'Length',value:`${sequence.length} nt`},
          {label:'Type',value:isRNA?'RNA':'DNA'},
          {label:'GC Content',value:`${gc}%`},
          {label:'AT/AU Content',value:`${at}%`},
          {label:'AT/GC Ratio',value:ratio},
          {label:'Melting Temp',value:calcTm(sequence)},
          {label:'Complement',value:`${generateComplementary(sequence).substring(0,12)}...`},
        ].map(s=>(
          <div key={s.label} className="ba-stat-card">
            <div className="ba-stat-label">{s.label}</div>
            <div className="ba-stat-val">{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{marginBottom:16}}>
        <div className="ba-section-title" style={{fontSize:12}}>Nucleotide Distribution</div>
        {nucs.map(n=>(
          <div key={n} style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
            <span style={{width:16,fontFamily:'monospace',fontWeight:700,color:C.mint}}>{n}</span>
            <div className="ba-progress" style={{flex:1}}>
              <div className="ba-progress-fill" style={{width:`${pct[n]}%`}}/>
            </div>
            <span style={{width:52,textAlign:'right',fontSize:11,color:'#888'}}>{pct[n].toFixed(2)}%</span>
          </div>
        ))}
      </div>
      {[
        {label:'Complementary Sequence',val:generateComplementary(sequence)},
        {label:'Reverse Complement',val:generateReverseComplement(sequence)},
        {label:'RNA Sequence',val:rna},
      ].map(s=>(
        <div key={s.label} style={{marginBottom:12}}>
          <div style={{fontSize:11,color:C.textMute,marginBottom:4}}>{s.label}</div>
          <pre style={{background:C.bg,border:'1px solid #223249',borderRadius:6,padding:'10px 14px',
            fontFamily:'monospace',fontSize:11,color:C.mint,whiteSpace:'pre-wrap',wordBreak:'break-all',margin:0,maxHeight:120,overflowY:'auto'}}>
            {s.val}
          </pre>
        </div>
      ))}
      {qualityScores&&(
        <div>
          <div style={{fontSize:11,color:C.textMute,marginBottom:4}}>FASTQ Quality Scores</div>
          <pre style={{background:C.bg,border:'1px solid #223249',borderRadius:6,padding:10,fontFamily:'monospace',fontSize:10,color:C.amber,whiteSpace:'pre-wrap',wordBreak:'break-all',margin:0}}>{qualityScores}</pre>
        </div>
      )}
    </div>
  );
}

function ProteinTabs({tab,proteinData,counts,totalAA,mw,pi,gravy,extCoeff,instab,aliphat,flexAvg,bulkAvg,absCoeff,basic,acidic,netCharge,cysCount,disulfide,groupCounts,singleLetterSeq,hydroProfile,flexProfile,bulkProfile,groupColorMap}){

  if(tab==='summary') return(
    <div>
      <div className="ba-stat-grid">
        {[
          {label:'Protein Length',value:`${totalAA} AA`},
          {label:'Molecular Weight',value:mw>10000?`${(mw/1000).toFixed(3)} kDa`:`${mw.toFixed(2)} Da`},
          {label:'Isoelectric Point',value:`pH ${pi}`},
          {label:'GRAVY Index',value:gravy},
          {label:'Aliphatic Index',value:aliphat},
          {label:'Instability Index',value:instab},
          {label:'Net Charge (pH7)',value:(netCharge>0?'+':'')+netCharge},
          {label:'Extinction Coeff',value:`${extCoeff.toLocaleString()} M⁻¹cm⁻¹`},
          {label:'A280/MW',value:absCoeff},
          {label:'Disulfide Bonds',value:`~${disulfide} (${cysCount} Cys)`},
          {label:'Avg Flexibility',value:flexAvg},
          {label:'Avg Bulkiness',value:bulkAvg},
        ].map(s=>(
          <div key={s.label} className="ba-stat-card">
            <div className="ba-stat-label">{s.label}</div>
            <div className="ba-stat-val">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="ba-grid-2" style={{marginTop:4}}>
        <div className="ba-card" style={{padding:14,marginBottom:0}}>
          <div style={{fontSize:12,color:C.mint,fontWeight:700,marginBottom:10}}>Charge & Stability</div>
          {[
            ['Basic residues (K+R+H)',`${basic} (${((basic/totalAA)*100).toFixed(1)}%)`,C.azure],
            ['Acidic residues (D+E)',`${acidic} (${((acidic/totalAA)*100).toFixed(1)}%)`,C.coral],
            ['Net charge pH7',(netCharge>0?'+':'')+netCharge,netCharge>=0?C.mint:C.coral],
            ['Protein character',parseFloat(pi)>7?'Basic':'Acidic',parseFloat(pi)>7?C.mint:C.coral],
            ['Stability (II)',parseFloat(instab)<40?'Stable (<40)':'Unstable (≥40)',parseFloat(instab)<40?C.mint:C.coral],
            ['Solubility',parseFloat(gravy)<0?'Likely soluble':'May be insoluble',parseFloat(gravy)<0?C.mint:C.amber],
          ].map(([k,v,c])=>(
            <div key={k} className="ba-row-between">
              <span style={{color:'#888'}}>{k}</span>
              <span style={{fontWeight:700,color:c||C.mint}}>{v}</span>
            </div>
          ))}
        </div>
        <div className="ba-card" style={{padding:14,marginBottom:0}}>
          <div style={{fontSize:12,color:C.mint,fontWeight:700,marginBottom:10}}>Key Residues</div>
          {[
            ['Cysteine (C)',counts['Cysteine']||0,`~${disulfide} disulfide bonds`],
            ['Tryptophan (W)',counts['Tryptophan']||0,'UV absorbing 280nm'],
            ['Proline (P)',counts['Proline']||0,'Helix disruptor'],
            ['Histidine (H)',counts['Histidine']||0,'Metal-binding, pKa≈6'],
            ['Glycine (G)',counts['Glycine']||0,'Smallest/flexible'],
            ['Methionine (M)',counts['Methionine']||0,'Start codon/redox'],
          ].map(([n,v,note])=>(
            <div key={n} className="ba-row-between" style={{alignItems:'center'}}>
              <div><strong style={{color:'#aaa'}}>{n}</strong><span style={{marginLeft:8,fontSize:10,color:'#555'}}>{note}</span></div>
              <span style={{background:'rgba(33,224,176,0.14)',color:C.mint,padding:'1px 8px',borderRadius:4,fontSize:11,fontWeight:700}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if(tab==='codons') return(
    <div>
      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
        {proteinData.codons.map((item,i)=>{
          const grp=item.isStop?null:aaGroups[item.aa];
          const col=item.isStop?C.coral:(GROUP_BORDER_COLOR[grp]||'#888');
          return(
            <div key={i} style={{border:`1px solid ${col}40`,borderRadius:6,padding:'6px 8px',minWidth:68,textAlign:'center',
              background:item.isStop?col+'10':'transparent',cursor:'default'}}>
              <div style={{fontFamily:'monospace',fontSize:13,fontWeight:700,color:col}}>{item.codon}</div>
              <div style={{fontSize:10,color:col}}>{item.isStop?'■ STOP':`${singleLetter[item.aa]||'?'}·${threeLetter[item.aa]||item.aa}`}</div>
              <div style={{fontSize:9,color:'#555'}}>#{item.position}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if(tab==='composition') return(
    <div>
      {Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([aa,n])=>{
        const g=aaGroups[aa]||'Nonpolar';
        const col=GROUP_BORDER_COLOR[g]||C.mint;
        return(
          <div key={aa} style={{display:'flex',alignItems:'center',gap:10,marginBottom:7}}>
            <span style={{width:42,fontSize:10,color:'#888',textAlign:'right',fontFamily:'monospace'}}>{threeLetter[aa]||aa}</span>
            <div className="ba-progress" style={{flex:1}}>
              <div className="ba-progress-fill" style={{width:`${(n/totalAA)*100}%`,background:col}}/>
            </div>
            <span style={{width:60,textAlign:'right',fontSize:11,color:col}}>{n} ({((n/totalAA)*100).toFixed(1)}%)</span>
          </div>
        );
      })}
    </div>
  );

  if(tab==='hydro') return(
    <div>
      <div className="ba-alert ba-alert-info">
        Kyte-Doolittle scale: Positive = hydrophobic · Negative = hydrophilic · GRAVY = {gravy}
      </div>
      {Object.entries(hydrophobicity).filter(([aa])=>counts[aa]).sort((a,b)=>b[1]-a[1]).map(([aa,val])=>(
        <div key={aa} style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
          <span style={{width:42,fontSize:10,color:'#888',textAlign:'right',fontFamily:'monospace'}}>{threeLetter[aa]||aa}</span>
          <div style={{flex:1,background:'#223249',borderRadius:4,height:12,overflow:'hidden'}}>
            <div style={{width:`${Math.abs(val)/4.5*100}%`,height:'100%',background:val>=0?C.mint:C.violet,borderRadius:4}}/>
          </div>
          <span style={{width:40,textAlign:'right',fontSize:11,color:val>=0?C.mint:C.violet,fontWeight:700}}>{val>0?'+':''}{val.toFixed(1)}</span>
          <span style={{width:24,fontSize:10,color:'#555'}}>×{counts[aa]}</span>
        </div>
      ))}
      {hydroProfile.length>0&&(
        <><div style={{fontSize:12,color:C.mint,marginTop:16,marginBottom:8}}>Hydrophobicity Profile (window=9)</div>
        <ProfileChart values={hydroProfile} stroke={C.mint} refVal={0} label="Kyte-Doolittle window=9"/></>
      )}
    </div>
  );

  if(tab==='groups') return(
    <div>
      <div className="ba-grid-autofill" style={{marginBottom:16}}>
        {Object.entries(groupCounts).map(([g,n])=>{
          const col=GROUP_BORDER_COLOR[g]||'#888';
          return(
            <div key={g} style={{background:C.bg||'#060a12',border:`1px solid ${col}40`,borderRadius:8,padding:12,textAlign:'center'}}>
              <span style={{background:col+'25',color:col,padding:'2px 8px',borderRadius:4,fontSize:10}}>{g}</span>
              <div style={{fontSize:22,fontWeight:700,color:col,margin:'6px 0'}}>{n}</div>
              <div style={{fontSize:10,color:'#555'}}>{((n/totalAA)*100).toFixed(1)}%</div>
            </div>
          );
        })}
      </div>
      <div style={{marginBottom:8,fontSize:12,color:C.textMute}}>Group Distribution</div>
      {Object.entries(groupCounts).sort((a,b)=>b[1]-a[1]).map(([g,n])=>{
        const col=GROUP_BORDER_COLOR[g]||'#888';
        return(
          <div key={g} style={{display:'flex',alignItems:'center',gap:10,marginBottom:7}}>
            <span style={{width:72,fontSize:10}}><span style={{background:col+'25',color:col,padding:'2px 7px',borderRadius:4,fontSize:10}}>{g}</span></span>
            <div className="ba-progress" style={{flex:1}}>
              <div className="ba-progress-fill" style={{width:`${(n/totalAA)*100}%`,background:col}}/>
            </div>
            <span style={{width:44,fontSize:10,color:col,textAlign:'right'}}>{((n/totalAA)*100).toFixed(1)}%</span>
          </div>
        );
      })}
    </div>
  );

  if(tab==='physical') return(
    <div>
      <table className="ba-table">
        <thead><tr><th className="ba-th">Parameter</th><th className="ba-th">Value</th><th className="ba-th">Notes</th></tr></thead>
        <tbody>
          {[
            ['Protein length',`${totalAA} amino acids`,'—'],
            ['Molecular weight',mw>10000?`${(mw/1000).toFixed(3)} kDa`:`${mw.toFixed(2)} Da`,'Average isotopic composition'],
            ['Isoelectric point (pI)',`pH ${pi}`,'Henderson-Hasselbalch, 200 iterations'],
            ['GRAVY index',gravy,parseFloat(gravy)>0?'Hydrophobic tendency':'Hydrophilic tendency'],
            ['Aliphatic index',aliphat,'Ikai 1980 — thermostability indicator'],
            ['Instability index (II)',instab,parseFloat(instab)<40?'✓ Stable (II<40)':'⚠ Unstable (II≥40)'],
            ['Extinction coeff ε',extCoeff.toLocaleString()+' M⁻¹cm⁻¹','Pace: Trp×5500+Tyr×1490+Cys×125'],
            ['Molar absorptivity ε/MW',absCoeff,'Used for concentration measurement'],
            ['Net charge at pH7',(netCharge>0?'+':'')+netCharge,'Basic − Acidic residues'],
            ['Basic residues (K+R+H)',`${basic} (${((basic/totalAA)*100).toFixed(1)}%)`,'—'],
            ['Acidic residues (D+E)',`${acidic} (${((acidic/totalAA)*100).toFixed(1)}%)`,'—'],
            ['Cysteine residues',cysCount,`~${disulfide} possible disulfide bonds`],
            ['Avg flexibility (B-P)',flexAvg,'Bhaskaran-Ponnuswamy — chain mobility'],
            ['Avg bulkiness (Zimm.)',bulkAvg,'Zimmerman — side chain volume'],
          ].map(([p,v,n])=>(
            <tr key={p}>
              <td className="ba-td">{p}</td>
              <td className="ba-td" style={{color:C.mint,fontWeight:700}}>{v}</td>
              <td className="ba-td" style={{color:'#555',fontSize:11}}>{n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if(tab==='profiles') return(
    <div>
      {[
        {label:'Hydrophobicity Profile (window=9)',vals:hydroProfile,stroke:C.mint,refVal:0,note:'Kyte-Doolittle'},
        {label:'Flexibility Profile (per residue)',vals:flexProfile,stroke:C.violet,refVal:0.40,note:'Bhaskaran-Ponnuswamy'},
        {label:'Bulkiness Profile (per residue)',vals:bulkProfile,stroke:C.amber,note:'Zimmerman'},
        {label:'MW per Residue',vals:proteinData.aaSeq.map(aa=>aminoAcidMW[aa]||111),stroke:C.coral,note:'Da'},
      ].map(({label,vals,stroke,refVal,note})=>(
        <div key={label} style={{marginBottom:16}}>
          <div style={{fontSize:12,color:'#aaa',marginBottom:6}}>{label} <span style={{color:'#555',fontSize:10}}>— {note}</span></div>
          {vals.length>0?<ProfileChart values={vals} stroke={stroke} refVal={refVal} label={label}/>:<div style={{color:'#555',fontSize:12}}>Sequence too short.</div>}
        </div>
      ))}
    </div>
  );

  if(tab==='sequence') return(
    <div>
      <div style={{fontSize:12,color:C.textMute,marginBottom:8}}>Single-Letter Code (colored by group)</div>
      <div style={{background:'#060a12',border:'1px solid #223249',borderRadius:8,padding:14,fontFamily:'monospace',fontSize:13,lineHeight:2.4,wordBreak:'break-all',marginBottom:14}}>
        {singleLetterSeq.match(/.{1,10}/g)?.map((chunk,i)=>(
          <span key={i}>
            <span style={{color:'#3d4d5e',fontSize:9,marginRight:4,userSelect:'none'}}>{String(i*10+1).padStart(4,' ')}</span>
            {chunk.split('').map((c,j)=>{
              const aaName=Object.keys(singleLetter).find(k=>singleLetter[k]===c);
              return<span key={j} style={{color:groupColorMap[aaGroups[aaName]]||C.mint}} title={aaName}>{c}</span>;
            })}{' '}
          </span>
        ))}
      </div>
      <div style={{fontSize:12,color:C.textMute,marginBottom:8}}>Three-Letter Badges</div>
      <div style={{marginBottom:14,lineHeight:2.2}}>
        {proteinData.aaSeq.map((aa,i)=>{
          const col=GROUP_BORDER_COLOR[aaGroups[aa||'Nonpolar']]||'#888';
          return<span key={i} style={{display:'inline-block',margin:'2px',padding:'2px 6px',borderRadius:4,background:col+'20',border:`1px solid ${col}50`,color:col,fontSize:10,fontFamily:'monospace'}}>{threeLetter[aa]||aa}</span>;
        })}
      </div>
    </div>
  );

  if(tab==='table') return(
    <table className="ba-table">
      <thead><tr>{['Amino Acid','3-Letter','1-Letter','Group','Count','%','MW(Da)','Hydrophobicity','Flexibility','Bulkiness'].map(h=><th key={h} className="ba-th">{h}</th>)}</tr></thead>
      <tbody>
        {Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([aa,n])=>{
          const g=aaGroups[aa]||'Nonpolar';
          const col=GROUP_BORDER_COLOR[g]||'#888';
          return(
            <tr key={aa}>
              <td className="ba-td">{aa}</td>
              <td className="ba-td" style={{fontFamily:'monospace'}}>{threeLetter[aa]||'—'}</td>
              <td className="ba-td" style={{fontFamily:'monospace',color:col,fontWeight:700}}>{singleLetter[aa]||'—'}</td>
              <td className="ba-td"><span style={{background:col+'20',color:col,padding:'1px 7px',borderRadius:4,fontSize:10}}>{g}</span></td>
              <td className="ba-td" style={{color:C.mint,fontWeight:700}}>{n}</td>
              <td className="ba-td">{((n/totalAA)*100).toFixed(1)}%</td>
              <td className="ba-td">{aminoAcidMW[aa]?.toFixed(2)||'—'}</td>
              <td className="ba-td" style={{color:(hydrophobicity[aa]||0)>=0?C.mint:C.violet,fontWeight:600}}>{hydrophobicity[aa]!==undefined?((hydrophobicity[aa]>0?'+':'')+hydrophobicity[aa].toFixed(1)):'—'}</td>
              <td className="ba-td">{flexibility[aa]?.toFixed(3)||'—'}</td>
              <td className="ba-td">{bulkiness[aa]?.toFixed(2)||'—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return null;
}

function StructureTabs({tab,aaSeq,counts,totalAA,singleLetterSeq,disulfide,gravy,netCharge,pi,instab}){
  if(tab==='folding') return(
    <div>
      <div style={{marginBottom:20,overflow:'auto',background:'#060a12',borderRadius:8,padding:16}}>
        <ProteinFoldingDiagram/>
      </div>
      <div className="ba-grid-2">
        {[
          {level:'1️⃣ Primary',color:C.mint,desc:'Linear AA sequence joined by peptide bonds. Directly from DNA codon reading frame 5′→3′.',example:`Your sequence: ${singleLetterSeq.substring(0,20)}${singleLetterSeq.length>20?'...':''}`},
          {level:'2️⃣ Secondary',color:C.violet,desc:'Local folding: α-helices (3.6 res/turn), β-sheets, random coils. Stabilized by H-bonds.',example:`Pro (helix disruptor): ${counts['Proline']||0} · Gly (flexible): ${counts['Glycine']||0}`},
          {level:'3️⃣ Tertiary',color:C.amber,desc:'Full 3D fold of single polypeptide. Disulfide bonds, hydrophobic core, electrostatics. AlphaFold predicts this.',example:`Disulfide: ~${disulfide} · GRAVY: ${gravy} · Charge: ${(netCharge>0?'+':'')+netCharge}`},
          {level:'4️⃣ Quaternary',color:C.coral,desc:'Multi-chain assembly (e.g. hemoglobin 4 chains). Requires multiple sequences. AlphaFold3 handles these.',example:'Example: antibody (2 heavy + 2 light chains)'},
        ].map(s=>(
          <div key={s.level} style={{background:'#060a12',border:`1px solid ${s.color}30`,borderRadius:8,padding:14}}>
            <div style={{fontSize:13,fontWeight:700,color:s.color,marginBottom:6}}>{s.level}</div>
            <p style={{fontSize:12,color:'#aaa',marginBottom:8,margin:'0 0 8px'}}>{s.desc}</p>
            <div style={{background:s.color+'12',border:`1px solid ${s.color}25`,borderRadius:6,padding:'6px 10px',fontSize:11,color:s.color}}>{s.example}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if(tab==='alphafold') return(
    <div>
      <div style={{background:'#060a12',borderRadius:8,padding:16,marginBottom:16,overflow:'auto'}}>
        <AlphaFoldDiagram/>
      </div>
      <div className="ba-alert ba-alert-info">
        AlphaFold2 by Google DeepMind — predicts 3D protein structure from amino acid sequence with experimental accuracy. Nobel Prize Chemistry 2024.
      </div>
      <div className="ba-grid-3">
        {[
          {stage:'Input',icon:'🔤',color:C.mint,details:[`Length: ${totalAA} AA`,`Seq: ${singleLetterSeq.substring(0,12)}...`,'One-hot encoded vectors','20-dimensional per position']},
          {stage:'MSA',icon:'🔍',color:C.violet,details:['JackHMMER / HHBlits','Search UniRef, BFD','[S × L] grid shape','Covariation signals']},
          {stage:'Evoformer',icon:'⚙️',color:C.coral,details:['48 transformer blocks','Row & col attention','Triangle updates','Triangle inequality']},
          {stage:'Structure Module',icon:'🏗️',color:C.amber,details:['8 blocks','Torsion angles φ,ψ','3D frames per residue','xyz coordinates']},
          {stage:'Recycling',icon:'🔄',color:C.azure,details:['3 iterations','Refine predictions','Better convergence','Improved accuracy']},
          {stage:'Output',icon:'📊',color:C.mint,details:['pLDDT per residue','PAE matrix','≥90 = very high conf','PDB format output']},
        ].map(s=>(
          <div key={s.stage} style={{background:'#060a12',border:`1px solid ${s.color}30`,borderRadius:8,padding:12}}>
            <div style={{fontSize:12,fontWeight:700,color:s.color,marginBottom:8}}>{s.icon} {s.stage}</div>
            {s.details.map((d,i)=><div key={i} style={{fontSize:11,color:'#888',marginBottom:3}}>· {d}</div>)}
          </div>
        ))}
      </div>
    </div>
  );

  if(tab==='3d') return(
    <div>
      <Protein3DView aaSeq={aaSeq}/>
      <div className="ba-alert ba-alert-neutral" style={{marginTop:12,fontSize:11}}>
        Simplified pseudo-3D model based on hydrophobicity-driven folding. For real predictions: alphafold.ebi.ac.uk
      </div>
      <div style={{marginTop:12}}>
        <div style={{fontSize:12,color:C.mint,marginBottom:8}}>Heuristic Secondary Structure</div>
        <div style={{background:'#060a12',border:'1px solid #223249',borderRadius:8,padding:14,fontFamily:'monospace',fontSize:14,lineHeight:2.4,wordBreak:'break-all'}}>
          {aaSeq.map((aa,i)=>{
            const h=hydrophobicity[aa]||0,isPro=aa==='Proline',isGly=aa==='Glycine';
            const ss=isPro||isGly?'C':h>1?'H':h<-1?'E':'C';
            const col=ss==='H'?C.coral:ss==='E'?C.violet:C.mint;
            return<span key={i} style={{color:col}} title={`${aa}: ${ss==='H'?'α-Helix':ss==='E'?'β-Sheet':'Coil'}`}>{singleLetter[aa]||'?'}</span>;
          })}
        </div>
        <div style={{display:'flex',gap:16,marginTop:8,fontSize:11}}>
          {[['H',C.coral,'α-Helix'],['E',C.violet,'β-Sheet'],['C',C.mint,'Random Coil']].map(([l,c,n])=>(
            <span key={l}><span style={{color:c,fontWeight:700,fontFamily:'monospace'}}>{l}</span> = {n}</span>
          ))}
        </div>
      </div>
    </div>
  );

  if(tab==='plddt') return(
    <div>
      <PLDDTBar aaSeq={aaSeq}/>
      <table className="ba-table" style={{marginTop:12}}>
        <thead><tr>{['#','Residue','1L','Group','pLDDT (est.)','Confidence'].map(h=><th key={h} className="ba-th">{h}</th>)}</tr></thead>
        <tbody>
          {aaSeq.slice(0,30).map((aa,i)=>{
            const h=Math.abs(hydrophobicity[aa]||0),b=bulkiness[aa]||15,f=flexibility[aa]||0.4;
            const score=Math.min(100,Math.max(20,50+h*5+b*1.2-f*20+Math.sin(i*0.7)*8));
            const conf=score>=90?'Very High':score>=70?'High':score>=50?'Low':'Very Low';
            const cc=score>=90?'#4f8ff0':score>=70?'#3ecf7e':score>=50?C.amber:C.coral;
            const g=aaGroups[aa]||'Nonpolar';
            const gc=GROUP_BORDER_COLOR[g]||'#888';
            return(
              <tr key={i}>
                <td className="ba-td">{i+1}</td>
                <td className="ba-td">{aa}</td>
                <td className="ba-td" style={{fontFamily:'monospace',color:gc,fontWeight:700}}>{singleLetter[aa]||'?'}</td>
                <td className="ba-td"><span style={{background:gc+'20',color:gc,padding:'1px 7px',borderRadius:4,fontSize:10}}>{g}</span></td>
                <td className="ba-td" style={{color:C.mint,fontWeight:700}}>{score.toFixed(1)}</td>
                <td className="ba-td"><span style={{background:cc+'20',color:cc,padding:'1px 7px',borderRadius:4,fontSize:10,fontWeight:600}}>{conf}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {aaSeq.length>30&&<div style={{fontSize:11,color:'#555',marginTop:6}}>Showing first 30 of {aaSeq.length} residues.</div>}
    </div>
  );

  if(tab==='contact') return(
    <div>
      <div className="ba-alert ba-alert-azure">
        Contact Map: Black/green = residues &lt;8Å apart (touching) · White = &gt;8Å · AlphaFold uses coevolution from MSA to predict these contacts.
      </div>
      <ContactMap aaSeq={aaSeq}/>
      <div style={{display:'flex',gap:16,marginTop:8,fontSize:11,color:'#888'}}>
        <span><span style={{display:'inline-block',width:12,height:12,background:C.mint,borderRadius:2,marginRight:4,verticalAlign:'middle'}}/>Contact (&lt;8Å)</span>
        <span><span style={{display:'inline-block',width:12,height:12,background:'#ffffff08',border:'1px solid #333',borderRadius:2,marginRight:4,verticalAlign:'middle'}}/>No contact (&gt;8Å)</span>
        <span><span style={{display:'inline-block',width:12,height:12,background:C.mint,borderRadius:2,marginRight:4,verticalAlign:'middle'}}/>Diagonal = self</span>
      </div>
    </div>
  );

  if(tab==='hmm') return(
    <div>
      <div style={{background:'#060a12',borderRadius:8,padding:16,marginBottom:16,overflow:'auto'}}>
        <HMMDiagram states={Math.min(aaSeq.length,6)}/>
      </div>
      <div className="ba-alert ba-alert-neutral" style={{fontSize:12}}>
        <strong style={{color:C.mint}}>Match (M):</strong> conserved columns ·&nbsp;
        <strong style={{color:C.amber}}>Insertion (I):</strong> extra characters ·&nbsp;
        <strong style={{color:C.coral}}>Deletion (D):</strong> gap in column ·&nbsp;
        HMM size = 3×{totalAA}+3 = {3*totalAA+3} states
      </div>
      <div className="ba-grid-3">
        {[
          {state:'Match States (M)',shape:'■',color:C.violet,desc:'Conserved alignment columns. Emission probabilities from residue counts per column.',formula:`e_M(a) = count(a) / total sequences`},
          {state:'Insertion States (I)',shape:'◆',color:C.amber,desc:'Extra chars in non-seed columns (gap fraction > θ=0.35). Can loop to self.',formula:'t(I→I)=0.4, t(I→M)=0.6'},
          {state:'Deletion States (D)',shape:'⬤',color:C.coral,desc:'Gaps in match columns. Silent state — no character emitted. Sequence skips position.',formula:'e_D(a) = 0 for all a'},
          {state:'Transition Probs',shape:'→',color:C.azure,desc:'count(X→Y) / count(start at X). Sums to 1 from each state.',formula:'t(M→I)=count(M→I)/count(M)'},
          {state:'Seed Alignment',shape:'📋',color:C.mint,desc:'Remove columns with gap > θ=0.35 to get seed. Remaining cols = Match states.',formula:'θ = 0.35 (default)'},
          {state:'HMM Size',shape:'📏',color:C.violet,desc:`3 states per position (M,I,D) + start/end/I₀.`,formula:`3×${totalAA}+3 = ${3*totalAA+3} states`},
        ].map(s=>(
          <div key={s.state} style={{background:'#060a12',border:`1px solid ${s.color}30`,borderRadius:8,padding:12}}>
            <div style={{fontSize:12,fontWeight:700,color:s.color,marginBottom:6}}>{s.shape} {s.state}</div>
            <p style={{fontSize:11,color:'#888',marginBottom:6,margin:'0 0 6px'}}>{s.desc}</p>
            <code style={{fontSize:10,background:'#131d2f',padding:'2px 6px',borderRadius:4,color:'#9aa8bd'}}>{s.formula}</code>
          </div>
        ))}
      </div>
    </div>
  );
  return null;
}

// ── TOOL: PSSM ─────────────────────────────────────────────────
function ToolPSSM({msaInput,setMsaInput,onBuild,pssm}){
  return(
    <div>
      <div style={{marginBottom:12,fontSize:12,color:'#94a3b8',lineHeight:1.6}}>
        <strong style={{color:C.mint}}>PSSM</strong> (Position Specific Scoring Matrix) — Enter multiple sequences (one per line) representing a Multiple Sequence Alignment. PSSM calculates per-position amino acid frequencies and log-odds scores vs background frequency.
      </div>
      <div style={{marginBottom:8,fontSize:11,color:C.textMute}}>MSA Sequences (one per line, gaps optional):</div>
      <textarea rows={5} className="ba-textarea" style={{marginBottom:8}}
        placeholder={"ACDEFGHIKLMNPQRSTVWY\nACDEFGHIKLMNPQRSTVWY\nACDEFGHIKLMNPQRST---"}
        value={msaInput} onChange={e=>setMsaInput(e.target.value)}/>
      <button onClick={onBuild} className="ba-btn ba-btn-primary" style={{marginBottom:16}}>
        Generate PSSM
      </button>
      {pssm&&(
        <>
          <div style={{fontSize:12,color:C.mint,marginBottom:8}}>PSSM — {pssm.length} positions × 20 amino acids</div>
          <div className="ba-card" style={{padding:'8px',marginBottom:12,fontSize:11,color:'#888',lineHeight:1.5}}>
            Color scale: <span style={{color:C.mint}}>■ Positive (preferred)</span> · <span style={{color:C.violet}}>■ ~0 (neutral)</span> · <span style={{color:C.coral}}>■ Negative (penalized)</span>
            <br/>Top row = dominant AA per position. Score = log₂(observed/background freq).
          </div>
          <PSSMChart pssm={pssm}/>
          <div style={{marginTop:12}}>
            <div style={{fontSize:11,color:C.textMute,marginBottom:6}}>Position Summary Table</div>
            <div className="ba-scroll-box">
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
                <thead><tr>
                  {['Pos','Dominant AA','Top Score','Conserved?',...AA_LETTERS.slice(0,8)].map(h=>(
                    <th key={h} style={{padding:'5px 8px',borderBottom:'1px solid #223249',color:C.textMute,fontSize:10,textAlign:'left'}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {pssm.map((pos,i)=>{
                    const maxScore=Math.max(...AA_LETTERS.map(aa=>pos.scores[aa]||0));
                    const isConserved=maxScore>2;
                    return(
                      <tr key={i} style={{borderBottom:'1px solid #0f1726'}}>
                        <td style={{padding:'4px 8px',color:'#555'}}>{pos.pos}</td>
                        <td style={{padding:'4px 8px',color:C.mint,fontWeight:700,fontFamily:'monospace'}}>{pos.dominantAA}</td>
                        <td style={{padding:'4px 8px',color:maxScore>=0?C.mint:C.coral}}>{maxScore.toFixed(1)}</td>
                        <td style={{padding:'4px 8px'}}><span style={{background:isConserved?'rgba(33,224,176,0.14)':'#131d2f',color:isConserved?C.mint:'#555',padding:'1px 6px',borderRadius:3,fontSize:9}}>{isConserved?'✓':'—'}</span></td>
                        {AA_LETTERS.slice(0,8).map(aa=>{
                          const v=pos.scores[aa]||0;
                          return<td key={aa} style={{padding:'4px 6px',color:v>1?C.mint:v<-1?C.coral:'#555',fontSize:10}}>{v>0?'+':''}{v.toFixed(1)}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── TOOL: HMM ──────────────────────────────────────────────────
function ToolHMM({msaInput,setMsaInput,onBuild,hmm}){
  return(
    <div>
      <div style={{marginBottom:12,fontSize:12,color:'#94a3b8',lineHeight:1.6}}>
        <strong style={{color:C.mint}}>Profile HMM</strong> — A probabilistic model representing a protein family. Built from MSA, it has Match (M), Insertion (I), and Deletion (D) states per position with associated emission and transition probabilities.
      </div>
      <textarea rows={5} className="ba-textarea" style={{marginBottom:8}}
        placeholder={"ACDEFGHIKLM\nACDEFGHIKLM\nAC-EFGHIKLM"}
        value={msaInput} onChange={e=>setMsaInput(e.target.value)}/>
      <button onClick={onBuild} className="ba-btn ba-btn-primary" style={{marginBottom:16}}>
        Build HMM
      </button>
      {hmm&&(
        <>
          <div className="ba-grid-4" style={{marginBottom:12}}>
            {[
              {label:'Match States',value:hmm.states.length},
              {label:'Sequences (MSA)',value:hmm.numSeqs},
              {label:'Gap Threshold θ',value:hmm.gapThreshold},
              {label:'Total States',value:hmm.states.length*3+3},
            ].map(s=>(
              <div key={s.label} className="ba-stat-card">
                <div className="ba-stat-label">{s.label}</div>
                <div style={{fontSize:16,fontWeight:700,color:C.mint}}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{background:'#060a12',borderRadius:8,padding:16,marginBottom:12,overflow:'auto'}}>
            <HMMDiagram states={hmm.states.length}/>
          </div>
          <div style={{fontSize:12,color:C.textMute,marginBottom:8}}>Match State Emission Probabilities (top 5 AAs per state)</div>
          <div className="ba-scroll-box">
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
              <thead><tr>
                {['State','Top AA','2nd','3rd','4th','5th','M→M','M→I','M→D'].map(h=>(
                  <th key={h} style={{padding:'5px 8px',borderBottom:'1px solid #223249',color:C.textMute,fontSize:10}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {hmm.states.map((state,i)=>{
                  const sorted=AA_LETTERS.slice().sort((a,b)=>(state.emissions[b]||0)-(state.emissions[a]||0));
                  const tr=hmm.transitions[i]||{};
                  return(
                    <tr key={i} style={{borderBottom:'1px solid #0f1726'}}>
                      <td style={{padding:'4px 8px',color:C.violet,fontWeight:700}}>M{state.idx}</td>
                      {sorted.slice(0,5).map((aa,j)=>(
                        <td key={j} style={{padding:'4px 8px',color:j===0?C.mint:'#888',fontFamily:'monospace',fontWeight:j===0?700:400}}>
                          {aa}<sub style={{fontSize:8}}>{((state.emissions[aa]||0)*100).toFixed(0)}%</sub>
                        </td>
                      ))}
                      <td style={{padding:'4px 8px',color:'#94a3b8',fontSize:10}}>{tr['M→M']||'—'}</td>
                      <td style={{padding:'4px 8px',color:C.amber,fontSize:10}}>{tr['M→I']||'—'}</td>
                      <td style={{padding:'4px 8px',color:C.coral,fontSize:10}}>{tr['M→D']||'—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="ba-card" style={{marginTop:12,padding:14,fontSize:12}}>
            <div style={{color:C.mint,fontWeight:700,marginBottom:8}}>HMM Transitions Summary</div>
            <div className="ba-grid-3" style={{fontSize:11}}>
              {[['M→M','Stay in match (aligned)',C.mint],['M→I','Enter insertion state',C.amber],['M→D','Skip (deletion)',C.coral],
                ['I→I','Another insertion',C.amber],['I→M','Return to match',C.azure],['D→M','Resume match',C.mint]].map(([k,desc,c])=>(
                <div key={k} style={{background:'#060a12',borderRadius:6,padding:'8px 10px'}}>
                  <div style={{fontFamily:'monospace',color:c,fontWeight:700,fontSize:12}}>{k}</div>
                  <div style={{color:'#555',fontSize:10,marginTop:2}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── TOOL: VITERBI ──────────────────────────────────────────────
function ToolViterbi({viterbiSeq,setViterbiSeq,onRun,result,hmm}){
  return(
    <div>
      <div style={{marginBottom:12,fontSize:12,color:'#94a3b8',lineHeight:1.6}}>
        <strong style={{color:C.mint}}>Viterbi Algorithm</strong> — Finds the most probable state path through the HMM for a given sequence. Uses dynamic programming to maximize joint probability P(sequence,path). Build HMM first (in PSSM/HMM tab), then enter a sequence below.
      </div>
      {!hmm&&<div className="ba-alert ba-alert-warning">
        ⚠ Build an HMM first using the PSSM/HMM tab.
      </div>}
      <div style={{marginBottom:8,fontSize:11,color:C.textMute}}>Query Sequence (amino acid single-letter codes):</div>
      <textarea rows={3} className="ba-textarea" style={{marginBottom:8}}
        placeholder="ACDEFGHIKLM..." value={viterbiSeq} onChange={e=>setViterbiSeq(e.target.value.toUpperCase())}/>
      <button onClick={onRun} disabled={!hmm} className="ba-btn ba-btn-violet" style={{marginBottom:16,opacity:hmm?1:0.5}}>
        Run Viterbi
      </button>
      {result&&(
        <>
          <div className="ba-grid-3" style={{marginBottom:12}}>
            {[
              {label:'Sequence Length',value:result.seq.length+' AA'},
              {label:'Total Log-Prob',value:result.totalLogP},
              {label:'Path States',value:result.path.length},
            ].map(s=>(
              <div key={s.label} className="ba-stat-card">
                <div className="ba-stat-label">{s.label}</div>
                <div style={{fontSize:14,fontWeight:700,color:C.violet}}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{fontSize:12,color:C.textMute,marginBottom:8}}>Most Probable State Path (Viterbi traceback)</div>
          <div style={{background:'#060a12',border:'1px solid #223249',borderRadius:8,padding:12,fontFamily:'monospace',fontSize:11,lineHeight:2.2,wordBreak:'break-all',marginBottom:12}}>
            {result.path.map((p,i)=>(
              <span key={i} title={`Pos ${p.pos}: ${p.aa} → State M${p.state}, logP=${p.logP}`}
                style={{display:'inline-block',margin:'2px',padding:'2px 7px',borderRadius:4,background:'rgba(155,123,240,0.14)',border:'1px solid rgba(155,123,240,0.3)',color:'#c3b3f7',cursor:'default'}}>
                {p.aa}<sub style={{fontSize:7}}>{p.state}</sub>
              </span>
            ))}
          </div>
          <div style={{fontSize:12,color:C.textMute,marginBottom:8}}>Detailed Viterbi Path</div>
          <div className="ba-scroll-box">
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:11}}>
              <thead><tr>{['Pos','AA','Match State','Log Probability'].map(h=><th key={h} style={{padding:'5px 8px',borderBottom:'1px solid #223249',color:C.textMute,fontSize:10}}>{h}</th>)}</tr></thead>
              <tbody>
                {result.path.map((p,i)=>(
                  <tr key={i} style={{borderBottom:'1px solid #0f1726'}}>
                    <td style={{padding:'4px 8px',color:'#555'}}>{p.pos}</td>
                    <td style={{padding:'4px 8px',color:C.mint,fontFamily:'monospace',fontWeight:700}}>{p.aa}</td>
                    <td style={{padding:'4px 8px',color:C.violet,fontWeight:700}}>M{p.state}</td>
                    <td style={{padding:'4px 8px',color:parseFloat(p.logP)>-5?'#3ecf7e':C.amber}}>{p.logP}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ba-card" style={{marginTop:12,padding:14,fontSize:12}}>
            <div style={{color:C.mint,fontWeight:700,marginBottom:8}}>Viterbi Algorithm — Theory</div>
            <ol style={{color:'#888',fontSize:11,lineHeight:2,paddingLeft:18,margin:0}}>
              <li><strong style={{color:'#aaa'}}>Initialization:</strong> V[0][j] = log P(x₁ | state j) for all states j</li>
              <li><strong style={{color:'#aaa'}}>Recursion:</strong> V[i][j] = max_k [V[i-1][k] + log P(k→j)] + log P(xᵢ | j)</li>
              <li><strong style={{color:'#aaa'}}>Traceback:</strong> Follow backpointers from argmax V[n][j] to find best path</li>
              <li><strong style={{color:'#aaa'}}>Complexity:</strong> O(n × m²) where n=sequence length, m=number of states</li>
              <li><strong style={{color:'#aaa'}}>Use log-space:</strong> Prevents numeric underflow with many small probabilities</li>
            </ol>
          </div>
        </>
      )}
    </div>
  );
}

// ── TOOL: ALIGNMENT ────────────────────────────────────────────
function ToolAlignment({alignSeq1,setAlignSeq1,alignSeq2,setAlignSeq2,method,setMethod,onAlign,result}){
  return(
    <div>
      <div style={{marginBottom:12,fontSize:12,color:'#94a3b8',lineHeight:1.6}}>
        <strong style={{color:C.mint}}>Sequence Alignment</strong> using BLOSUM62 scoring matrix.
        <strong style={{color:C.violet}}> Smith-Waterman (local)</strong> finds best matching sub-region.
        <strong style={{color:C.amber}}> Needleman-Wunsch (global)</strong> aligns entire sequences end-to-end.
        Gap penalty = -2.
      </div>
      <div className="ba-grid-2" style={{marginBottom:10}}>
        {[{label:'Sequence 1',val:alignSeq1,set:setAlignSeq1},{label:'Sequence 2',val:alignSeq2,set:setAlignSeq2}].map(s=>(
          <div key={s.label}>
            <div style={{fontSize:11,color:C.textMute,marginBottom:4}}>{s.label} (single-letter AA or nucleotides):</div>
            <textarea rows={3} className="ba-textarea" style={{padding:'8px 12px'}}
              placeholder="ACDEFGHIKLM..." value={s.val} onChange={e=>s.set(e.target.value.toUpperCase())}/>
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:12,flexWrap:'wrap'}}>
        <div style={{fontSize:11,color:C.textMute}}>Algorithm:</div>
        {[{id:'local',label:'Smith-Waterman (Local)'},{id:'global',label:'Needleman-Wunsch (Global)'}].map(m=>(
          <button key={m.id} onClick={()=>setMethod(m.id)} className={`ba-btn-tab${method===m.id?' active':''}`}>
            {m.label}
          </button>
        ))}
        <button onClick={onAlign} className="ba-btn ba-btn-primary">
          Align Sequences
        </button>
      </div>
      {result&&(
        <>
          <div className="ba-grid-3" style={{marginBottom:12}}>
            {[
              {label:'Alignment Score',value:result.score},
              {label:'Identity',value:`${result.identity}%`},
              {label:'Aligned Length',value:result.align1.length+' bp'},
            ].map(s=>(
              <div key={s.label} className="ba-stat-card">
                <div className="ba-stat-label">{s.label}</div>
                <div style={{fontSize:16,fontWeight:700,color:C.mint}}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{background:'#060a12',border:'1px solid #223249',borderRadius:8,padding:14,fontFamily:'monospace',fontSize:12,overflowX:'auto',marginBottom:12}}>
            <div style={{color:C.azure,marginBottom:4}}>Seq1: {result.align1.match(/.{1,60}/g)?.join('\n     ')}</div>
            <div style={{color:'#555',marginBottom:4}}>      {result.matchStr.match(/.{1,60}/g)?.join('\n     ')}</div>
            <div style={{color:C.amber}}>Seq2: {result.align2.match(/.{1,60}/g)?.join('\n     ')}</div>
          </div>
          <div className="ba-card" style={{padding:14}}>
            <div style={{color:C.mint,fontWeight:700,marginBottom:8}}>Alignment Legend</div>
            <div style={{display:'flex',gap:20,fontSize:11,color:'#888',flexWrap:'wrap'}}>
              <span><code style={{color:C.azure}}>|</code> = identical match (BLOSUM positive)</span>
              <span><code style={{color:'#555'}}>:</code> = similar (positive BLOSUM score)</span>
              <span><code style={{color:'#223249'}}> </code> = mismatch or gap</span>
              <span><code style={{color:C.coral}}>-</code> = gap (penalty = -2)</span>
            </div>
            <div style={{marginTop:8,fontSize:11,color:'#555'}}>
              BLOSUM62: substitution matrix derived from ~62% identity protein block alignments.
              Higher score = more likely substitution in related proteins.
            </div>
          </div>
        </>
      )}
    </div>
  );
}