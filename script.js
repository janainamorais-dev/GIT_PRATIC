// ─────────────────────────────────────────
// MISSIONS DATA — 20 LEVELS
// ─────────────────────────────────────────
const MISSIONS = [
  {
    id:1, title:"Inicializando o Repositório", cat:"Básico", diff:"beginner", xp:30,
    story:"Você foi contratado como dev junior. Seu primeiro desafio: inicializar o repositório Git do projeto.",
    obj:"Execute o comando para criar um novo repositório Git nesta pasta.",
    hint:"git init",
    tasks:["Inicializar repositório Git"],
    branch:"(none)",
    solution:(cmd,s)=> cmd.trim()==="git init",
    onSuccess:(s)=>{ s.branch="main"; s.initialized=true; }
  },
  {
    id:2, title:"Configurando sua Identidade", cat:"Básico", diff:"beginner", xp:30,
    story:"Antes de commitar, o Git precisa saber quem é você. Configure seu nome e email.",
    obj:"Configure seu nome: git config user.name \"Seu Nome\"",
    hint:"git config user.name \"Seu Nome\"",
    tasks:["Configurar nome de usuário"],
    branch:"main",
    solution:(cmd,s)=> cmd.includes("git config") && cmd.includes("user.name"),
    onSuccess:(s)=>{}
  },
  {
    id:3, title:"Primeiro Arquivo & Status", cat:"Básico", diff:"beginner", xp:40,
    story:"Arquivo README.md foi criado na pasta. Verifique o status do repositório para entender o estado atual.",
    obj:"Verifique o status do repositório com git status",
    hint:"git status",
    tasks:["Verificar status do repositório"],
    branch:"main",
    files:[{name:"README.md",status:"new"}],
    solution:(cmd,s)=> cmd.trim()==="git status",
    onSuccess:(s)=>{}
  },
  {
    id:4, title:"Staging Area — git add", cat:"Básico", diff:"beginner", xp:50,
    story:"README.md está untracked. Adicione-o à staging area para prepará-lo para o commit.",
    obj:"Adicione o README.md à staging area",
    hint:"git add README.md  ou  git add .",
    tasks:["Adicionar arquivo à staging area"],
    branch:"main",
    files:[{name:"README.md",status:"new"}],
    solution:(cmd,s)=> cmd.includes("git add"),
    onSuccess:(s)=>{ s.staged=true; }
  },
  {
    id:5, title:"Primeiro Commit", cat:"Básico", diff:"beginner", xp:60,
    story:"Arquivos na staging area prontos. Agora faça o primeiro commit com uma mensagem descritiva.",
    obj:"Faça commit com mensagem: git commit -m \"Initial commit\"",
    hint:"git commit -m \"Initial commit\"",
    tasks:["Criar o primeiro commit"],
    branch:"main",
    files:[{name:"README.md",status:"staged"}],
    solution:(cmd,s)=> cmd.includes("git commit") && cmd.includes("-m"),
    onSuccess:(s)=>{ s.commits=["C1"]; }
  },
  {
    id:6, title:"Git Log — Histórico de Commits", cat:"Básico", diff:"beginner", xp:40,
    story:"Você quer ver o histórico de commits do projeto. Use git log para visualizá-lo.",
    obj:"Visualize o histórico de commits",
    hint:"git log  ou  git log --oneline",
    tasks:["Ver histórico de commits"],
    branch:"main",
    solution:(cmd,s)=> cmd.includes("git log"),
    onSuccess:(s)=>{}
  },
  {
    id:7, title:"Criando uma Branch", cat:"Branches", diff:"beginner", xp:70,
    story:"O time vai adicionar uma nova feature. No Git, features devem ser desenvolvidas em branches separadas.",
    obj:"Crie uma branch chamada 'feature/navbar'",
    hint:"git branch feature/navbar",
    tasks:["Criar branch feature/navbar"],
    branch:"main",
    solution:(cmd,s)=> cmd.includes("git branch") && cmd.includes("feature/navbar"),
    onSuccess:(s)=>{ s.branches.push("feature/navbar"); }
  },
  {
    id:8, title:"Trocando de Branch — Checkout", cat:"Branches", diff:"beginner", xp:70,
    story:"Branch criada! Agora você precisa mudar para ela para começar a trabalhar.",
    obj:"Mude para a branch 'feature/navbar'",
    hint:"git checkout feature/navbar",
    tasks:["Mudar para feature/navbar"],
    branch:"main",
    solution:(cmd,s)=> (cmd.includes("git checkout") || cmd.includes("git switch")) && cmd.includes("feature/navbar"),
    onSuccess:(s)=>{ s.branch="feature/navbar"; }
  },
  {
    id:9, title:"Criar & Trocar em um Passo", cat:"Branches", diff:"intermediate", xp:80,
    story:"Aprenda o atalho para criar e mudar de branch em um único comando — muito mais eficiente!",
    obj:"Crie e mude para 'feature/auth' de uma vez",
    hint:"git checkout -b feature/auth",
    tasks:["Criar e acessar feature/auth"],
    branch:"main",
    solution:(cmd,s)=> cmd.includes("git checkout -b") && cmd.includes("feature/auth"),
    onSuccess:(s)=>{ s.branch="feature/auth"; s.branches.push("feature/auth"); }
  },
  {
    id:10, title:"Merge — Integrando Features", cat:"Branches", diff:"intermediate", xp:100,
    story:"A feature está pronta! Volte para main e integre as mudanças com git merge.",
    obj:"1) git checkout main  2) git merge feature/auth",
    hint:"git checkout main  →  git merge feature/auth",
    tasks:["Voltar para main","Fazer merge da feature"],
    branch:"feature/auth",
    solution:(cmd,s)=>{
      if(cmd.includes("git checkout main")||cmd.includes("git switch main")) s.onMain=true;
      if(cmd.includes("git merge")&&s.onMain) return true;
      return false;
    },
    onSuccess:(s)=>{ s.branch="main"; }
  },
  {
    id:11, title:"Git Flow — Setup Inicial", cat:"Git Flow", diff:"intermediate", xp:120,
    story:"Seu time adota Git Flow! O primeiro passo é criar a branch develop a partir de main.",
    obj:"Crie a branch 'develop' a partir de 'main'",
    hint:"git checkout -b develop main",
    tasks:["Criar branch develop"],
    branch:"main",
    flowDiagram:`main    ──●──
                   │
develop ──────────●`,
    solution:(cmd,s)=> cmd.includes("git checkout -b develop")||cmd.includes("git branch develop"),
    onSuccess:(s)=>{ s.branches.push("develop"); }
  },
  {
    id:12, title:"Git Flow — Feature Branch", cat:"Git Flow", diff:"intermediate", xp:130,
    story:"No Git Flow, features partem de develop — nunca de main. Crie uma feature branch correta.",
    obj:"Crie 'feature/payment' a partir de 'develop'",
    hint:"git checkout -b feature/payment develop",
    tasks:["Criar feature a partir de develop"],
    branch:"develop",
    flowDiagram:`main ──●────────────
                  │
develop ──────────●──●
                     │
feature/payment  ────●`,
    solution:(cmd,s)=> cmd.includes("git checkout -b feature/payment"),
    onSuccess:(s)=>{ s.branch="feature/payment"; s.branches.push("feature/payment"); }
  },
  {
    id:13, title:"Git Flow — Merge Feature em Develop", cat:"Git Flow", diff:"intermediate", xp:130,
    story:"Feature pronta! No Git Flow, features são mergeadas de volta para develop, não para main.",
    obj:"1) Volte para develop  2) Merge feature/payment",
    hint:"git checkout develop → git merge --no-ff feature/payment",
    tasks:["Voltar para develop","Merge feature com --no-ff"],
    branch:"feature/payment",
    solution:(cmd,s)=>{
      if(cmd.includes("git checkout develop")||cmd.includes("git switch develop")) s.onDev=true;
      if(cmd.includes("git merge")&&s.onDev) return true;
      return false;
    },
    onSuccess:(s)=>{ s.branch="develop"; }
  },
  {
    id:14, title:"Git Flow — Release Branch", cat:"Git Flow", diff:"advanced", xp:150,
    story:"Hora de lançar a versão 1.0! No Git Flow, releases partem de develop e vão para main e develop.",
    obj:"Crie a branch 'release/1.0' a partir de 'develop'",
    hint:"git checkout -b release/1.0 develop",
    tasks:["Criar release/1.0 a partir de develop"],
    branch:"develop",
    flowDiagram:`main ──●────────────────────●
                  │                    ↑
develop ──────────●──●──────────────────●
                        │          ↑
release/1.0  ───────────●──●──────`,
    solution:(cmd,s)=> cmd.includes("git checkout -b release/1.0")||cmd.includes("git checkout -b release/v1.0"),
    onSuccess:(s)=>{ s.branch="release/1.0"; s.branches.push("release/1.0"); }
  },
  {
    id:15, title:"Git Stash — Guardando Mudanças", cat:"Avançado", diff:"advanced", xp:160,
    story:"Você tem mudanças não commitadas mas precisa trocar de branch urgentemente. Use git stash!",
    obj:"Guarde suas mudanças temporariamente com git stash",
    hint:"git stash  ou  git stash push -m 'WIP: login'",
    tasks:["Guardar mudanças com stash"],
    branch:"feature/auth",
    files:[{name:"login.js",status:"modified"},{name:"auth.css",status:"modified"}],
    solution:(cmd,s)=> cmd.includes("git stash"),
    onSuccess:(s)=>{}
  },
  {
    id:16, title:"Git Rebase — Histórico Limpo", cat:"Avançado", diff:"advanced", xp:170,
    story:"O rebase reescreve o histórico aplicando seus commits sobre outro ponto. Cuidado: nunca rebase commits públicos!",
    obj:"Faça rebase da feature/ui sobre main",
    hint:"git checkout feature/ui → git rebase main",
    tasks:["Trocar para feature/ui","Fazer rebase sobre main"],
    branch:"main",
    flowDiagram:`Antes:  main ──●──●
                        │
               feat ────●──●

Depois: main ──●──●──●──●`,
    solution:(cmd,s)=>{
      if(cmd.includes("git checkout feature/ui")||cmd.includes("git switch feature/ui")) s.onFeat=true;
      if(cmd.includes("git rebase")&&s.onFeat) return true;
      return false;
    },
    onSuccess:(s)=>{ s.branch="feature/ui"; }
  },
  {
    id:17, title:"Resolvendo Conflitos", cat:"Avançado", diff:"advanced", xp:180,
    story:"Um merge gerou conflito em app.js! Após editar manualmente o arquivo, você deve marcar o conflito como resolvido.",
    obj:"1) Edite o arquivo  2) git add app.js  3) git commit",
    hint:"git add app.js → git commit -m 'resolve conflict'",
    tasks:["Adicionar arquivo resolvido","Commitar resolução"],
    branch:"main",
    files:[{name:"app.js",status:"conflict"},{name:"index.html",status:"modified"}],
    solution:(cmd,s)=>{
      if(cmd.includes("git add")) s.added=true;
      if(cmd.includes("git commit")&&s.added) return true;
      return false;
    },
    onSuccess:(s)=>{}
  },
  {
    id:18, title:"Git Flow — Hotfix", cat:"Git Flow", diff:"advanced", xp:190,
    story:"Bug crítico em produção! No Git Flow, hotfixes partem de main e são mergeados em main E develop.",
    obj:"Crie 'hotfix/fix-login' a partir de 'main'",
    hint:"git checkout -b hotfix/fix-login main",
    tasks:["Criar hotfix a partir de main"],
    branch:"main",
    flowDiagram:`main ──●────────────●──●
                  │              ↑  ↓
develop ──────────●──────────────────●
                        
hotfix ──────────────────●──●`,
    solution:(cmd,s)=> cmd.includes("git checkout -b hotfix/"),
    onSuccess:(s)=>{ s.branch="hotfix/fix-login"; s.branches.push("hotfix/fix-login"); }
  },
  {
    id:19, title:"Tags & Versões", cat:"Avançado", diff:"expert", xp:200,
    story:"O release 1.0 foi mergeado em main. Crie uma tag anotada para marcar permanentemente esta versão.",
    obj:"Crie uma tag anotada: git tag -a v1.0 -m 'Release 1.0'",
    hint:"git tag -a v1.0 -m 'Release 1.0'",
    tasks:["Criar tag anotada v1.0"],
    branch:"main",
    solution:(cmd,s)=> cmd.includes("git tag") && cmd.includes("-a"),
    onSuccess:(s)=>{ s.tags=["v1.0"]; }
  },
  {
    id:20, title:"Git Master — Fluxo Completo", cat:"Expert", diff:"expert", xp:300,
    story:"🏆 DESAFIO FINAL! Demonstre domínio total: crie uma branch, adicione arquivo, commit, e volte para main com merge.",
    obj:"1) checkout -b final/feature  2) git add .  3) git commit  4) checkout main  5) git merge",
    hint:"git checkout -b final/feature → git add . → git commit -m 'feat' → git checkout main → git merge final/feature",
    tasks:["Criar final/feature","git add","git commit","Voltar ao main","git merge"],
    branch:"main",
    solution:(cmd,s)=>{
      if(cmd.includes("git checkout -b final")) s.step1=true;
      if(cmd.includes("git add")&&s.step1) s.step2=true;
      if(cmd.includes("git commit")&&s.step2) s.step3=true;
      if((cmd.includes("checkout main")||cmd.includes("switch main"))&&s.step3) s.step4=true;
      if(cmd.includes("git merge")&&s.step4) return true;
      return false;
    },
    onSuccess:(s)=>{ s.branch="main"; }
  }
];

// ─────────────────────────────────────────
// STATE
// ─────────────────────────────────────────
let cur = 0;
let totalCmds = 0;
let totalXP = 0;
let streak = 0;
let completedLevels = new Set();
let cmdHistory = [];
let state = {};

function freshState(idx) {
  const m = MISSIONS[idx];
  return {
    branch: m.branch || "main",
    branches: ["main","develop"],
    commits: ["C1","C2"],
    staged: false, added: false, initialized: false,
    onMain: false, onDev: false, onFeat: false,
    step1: false, step2: false, step3: false, step4: false,
    tags: []
  };
}

// ─────────────────────────────────────────
// LOAD MISSION
// ─────────────────────────────────────────
function loadMission(idx) {
  cur = idx;
  state = freshState(idx);
  const m = MISSIONS[idx];

  document.getElementById('hMission').textContent = `${idx+1}/${MISSIONS.length}`;
  document.getElementById('bLevel').textContent = `Nível ${idx+1}`;
  document.getElementById('bCat').textContent = m.cat;

  const diffMap = {
    beginner:['Iniciante','badge-beginner'],
    intermediate:['Intermediário','badge-intermediate'],
    advanced:['Avançado','badge-advanced'],
    expert:['Expert','badge-expert']
  };
  const [dt, dc] = diffMap[m.diff] || ['?','badge-beginner'];
  const bd = document.getElementById('bDiff');
  bd.textContent = dt; bd.className = `badge ${dc}`;

  document.getElementById('mTitle').textContent = m.title;
  document.getElementById('mStory').textContent = m.story;
  document.getElementById('mObj').textContent = m.obj;
  document.getElementById('mHint').textContent = m.hint;

  const diag = document.getElementById('mDiagram');
  diag.innerHTML = m.flowDiagram ? `<div class="code-block">${m.flowDiagram}</div>` : '';

  document.getElementById('tOutput').innerHTML = '';
  document.getElementById('tInput').value = '';
  document.getElementById('tBranch').textContent = state.branch;
  document.getElementById('btnNext').disabled = true;

  const pct = ((idx+1)/MISSIONS.length)*100;
  document.getElementById('progressBar').style.width = pct+'%';

  renderTasks();
  renderFiles();
  renderGraph();
  renderLevelMap();

  addOut(`# Missão ${idx+1}: ${m.title}`, 'dim');
  addOut(`# Branch atual: ${state.branch}`, 'dim');
}

// ─────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────
function renderTasks() {
  const m = MISSIONS[cur];
  document.getElementById('taskList').innerHTML = m.tasks.map((t,i)=>`
    <div class="task" id="task${i}">
      <span class="task-ico">⏳</span>
      <span class="task-txt">${t}</span>
    </div>`).join('');
}

function completeTask(i) {
  const t = document.getElementById('task'+i);
  if(t) { t.classList.add('done'); t.querySelector('.task-ico').textContent='✅'; }
}

function renderFiles() {
  const m = MISSIONS[cur];
  const el = document.getElementById('fileList');
  if(!m.files||!m.files.length) { el.innerHTML='<div class="empty">Nenhum arquivo modificado</div>'; return; }
  const tagMap = {new:'ftag-new',modified:'ftag-mod',conflict:'ftag-conflict',staged:'ftag-staged',deleted:'ftag-deleted'};
  const lMap = {new:'Novo',modified:'Modificado',conflict:'Conflito!',staged:'Staged',deleted:'Deletado'};
  el.innerHTML = m.files.map(f=>`
    <div class="fitem">
      <span>${f.status==='conflict'?'⚠️':'📄'}</span>
      <span class="fitem-name">${f.name}</span>
      <span class="ftag ${tagMap[f.status]||''}">${lMap[f.status]||f.status}</span>
    </div>`).join('');
}

function renderGraph() {
  const el = document.getElementById('gitGraph');
  const b = state.branch;
  const branches = [
    {name:'main',cls:'g-main',commits:['C1','C2']},
    {name:'develop',cls:'g-develop',commits:['C1','C2','C3']}
  ];
  if(b.includes('feature')) branches.push({name:b,cls:'g-feature',commits:['C1']});
  if(b.includes('release')) branches.push({name:b,cls:'g-release',commits:['C1']});
  if(b.includes('hotfix')) branches.push({name:b,cls:'g-hotfix',commits:['C1']});

  el.innerHTML = branches.map(br=>`
    <div class="g-row">
      <span class="g-label ${br.cls} ${b===br.name?'g-current':''}">${br.name}</span>
      <div class="g-commits">
        ${br.commits.map((c,i)=>`<div class="g-commit ${b===br.name&&i===br.commits.length-1?'HEAD':''}">${i+1}</div>`).join('')}
      </div>
    </div>`).join('');
}

function renderLevelMap() {
  const el = document.getElementById('levelMap');
  el.innerHTML = MISSIONS.map((m,i)=>`
    <div class="lmap-dot ${completedLevels.has(i)?'done':''} ${i===cur?'active':''}"
         onclick="jumpTo(${i})" title="Missão ${i+1}: ${m.title}">${i+1}</div>`).join('');
}

function jumpTo(i) {
  if(completedLevels.has(i)||i===0||completedLevels.has(i-1)) loadMission(i);
}

// ─────────────────────────────────────────
// TERMINAL
// ─────────────────────────────────────────
function addOut(txt, cls='') {
  const el = document.getElementById('tOutput');
  const d = document.createElement('div');
  d.className = `out-line ${cls?'out-'+cls:''}`;
  d.textContent = txt;
  el.appendChild(d);
  el.scrollTop = el.scrollHeight;
}

function addHistory(cmd) {
  cmdHistory.unshift(cmd);
  totalCmds++;
  document.getElementById('hCmds').textContent = totalCmds;

  const el = document.getElementById('histList');
  if(el.querySelector('.empty')) el.innerHTML='';
  const d = document.createElement('div');
  d.className='hist-item';
  d.textContent = `$ ${cmd}`;
  el.insertBefore(d, el.firstChild);
  if(el.children.length>15) el.removeChild(el.lastChild);
}

function processCmd(cmd) {
  const m = MISSIONS[cur];
  addOut(`$ ${cmd}`, 'cmd');

  // always update branch display if checkout
  if((cmd.includes('git checkout')||cmd.includes('git switch'))&&!cmd.includes('-b')) {
    const match = cmd.match(/(?:checkout|switch)\s+(\S+)/);
    if(match) { state.branch = match[1]; document.getElementById('tBranch').textContent = state.branch; }
  }
  if(cmd.includes('-b')) {
    const match = cmd.match(/-b\s+(\S+)/);
    if(match) { state.branch = match[1]; document.getElementById('tBranch').textContent = state.branch; }
  }

  if(!cmd.startsWith('git')) {
    addOut('❌ Use comandos git. Ex: git init', 'err');
    return;
  }

  const done = m.solution(cmd, state);

  if(done) {
    if(m.onSuccess) m.onSuccess(state);
    document.getElementById('tBranch').textContent = state.branch;
    addOut('✅ Perfeito! Objetivo concluído!', 'ok');
    // mark all tasks done
    m.tasks.forEach((_,i)=>completeTask(i));
    completedLevels.add(cur);
    // XP
    totalXP += m.xp;
    streak++;
    document.getElementById('hXP').textContent = totalXP;
    document.getElementById('hStreak').textContent = `🔥 ${streak}`;
    document.getElementById('btnNext').disabled = false;
    renderGraph();
    renderLevelMap();
    showModal(m);
  } else {
    if(cmd.startsWith('git')) {
      addOut(`⚠️  Válido, mas não completa o objetivo. Tente: ${m.hint}`, 'info');
      renderGraph();
    }
  }
}

document.getElementById('tInput').addEventListener('keydown', function(e) {
  if(e.key==='Enter') {
    const cmd = this.value.trim();
    if(cmd) { addHistory(cmd); processCmd(cmd); this.value=''; }
  }
});

// ─────────────────────────────────────────
// ACTIONS
// ─────────────────────────────────────────
function showHint() {
  addOut(`💡 DICA: ${MISSIONS[cur].hint}`, 'info');
}

function resetMission() {
  completedLevels.delete(cur);
  loadMission(cur);
}

function nextMission() {
  closeModal();
  if(cur+1 >= MISSIONS.length) {
    showFinalModal(); return;
  }
  loadMission(cur+1);
}

// ─────────────────────────────────────────
// MODALS
// ─────────────────────────────────────────
const MSGS = [
  "Você está dominando o Git! 🚀",
  "Perfeito! Continue assim! ⭐",
  "Incrível progresso! 🎊",
  "Você é um herói do terminal! 🦸",
  "Commit de sucesso na vida! 💪"
];

function showModal(m) {
  document.getElementById('mEmoji').textContent = '🎉';
  document.getElementById('mModalTitle').textContent = 'Missão Completa!';
  document.getElementById('mModalSub').textContent = MSGS[Math.floor(Math.random()*MSGS.length)];
  document.getElementById('mModalXP').textContent = `⭐ +${m.xp} XP`;
  document.getElementById('modal').classList.add('show');
  setTimeout(()=>{ if(document.getElementById('modal').classList.contains('show')) closeModal(); }, 4000);
}

function showFinalModal() {
  document.getElementById('mEmoji').textContent = '🏆';
  document.getElementById('mModalTitle').textContent = 'Git Master!';
  document.getElementById('mModalSub').textContent = `Parabéns! Você completou todas as 20 missões com ${totalXP} XP! Você é um verdadeiro Git Master!`;
  document.getElementById('mModalXP').textContent = `🌟 Total: ${totalXP} XP`;
  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

// ─────────────────────────────────────────
// THEME
// ─────────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const cur = html.getAttribute('data-theme');
  const nxt = cur==='dark'?'light':'dark';
  html.setAttribute('data-theme', nxt);
  document.querySelector('.theme-btn').textContent = nxt==='dark'?'🌙':'☀️';
}

// ─────────────────────────────────────────
// INIT
// ─────────────────────────────────────────
loadMission(0);
