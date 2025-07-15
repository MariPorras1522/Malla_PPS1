const niveles = [
  {
    ciclo: "Nivel 1 - Ciclo 1",
    materias: [
      { id: "teoria", nombre: "Teoría de la organización" },
      { id: "paradigmas", nombre: "Paradigmas y enfoques de investigación", desbloquea: ["metodos"] },
      { id: "economia", nombre: "Economía general para planificación", desbloquea: ["micro"] },
      { id: "matematica", nombre: "Matemática financiera", desbloquea: ["contabilidad", "financiero"] }
    ]
  },
  {
    ciclo: "Nivel 1 - Ciclo 2",
    materias: [
      { id: "estructuras", nombre: "Estructuras, actores y movimientos sociales", desbloquea: ["genero"] },
      { id: "fundamentos", nombre: "Fundamentos de planificación", desbloquea: ["estrategica", "gestion"] },
      { id: "metodos", nombre: "Métodos y técnicas de investigación", requisitos: ["paradigmas"], desbloquea: ["diagnostico"] },
      { id: "contabilidad", nombre: "Contabilidad", requisitos: ["matematica"], desbloquea: ["presupuesto"] }
    ]
  },
  {
    ciclo: "Nivel 2 - Ciclo 1",
    materias: [
      { id: "genero", nombre: "Género y desarrollo", requisitos: ["estructuras"] },
      { id: "estad1", nombre: "Estadística de planificadores I", desbloquea: ["estad2"] },
      { id: "presupuesto", nombre: "Planificación y presupuesto", requisitos: ["contabilidad"] },
      { id: "admin", nombre: "Principios de administración" },
      { id: "idioma1", nombre: "Idioma integrado I", desbloquea: ["idioma2"] }
    ]
  },
  {
    ciclo: "Nivel 2 - Ciclo 2",
    materias: [
      { id: "micro", nombre: "Microeconomía para planificación", requisitos: ["economia"], desbloquea: ["macro"] },
      { id: "idioma2", nombre: "Idioma integrado II", requisitos: ["idioma1"] },
      { id: "comunicacion", nombre: "Procesos de comunicación y grupos" },
      { id: "estad2", nombre: "Estadística para planificación II", requisitos: ["estad1"] },
      { id: "diagnostico", nombre: "Diagnóstico y acción comunitaria", requisitos: ["metodos"], desbloquea: ["practica1"] }
    ]
  },
  {
    ciclo: "Nivel 3 - Ciclo 1",
    materias: [
      { id: "practica1", nombre: "Práctica planificación y promoción I", requisitos: ["diagnostico"], desbloquea: ["practica2"] },
      { id: "estrategica", nombre: "Planificación estratégica", requisitos: ["fundamentos"], desbloquea: ["prospectiva"] },
      { id: "form1", nombre: "Formulación y evaluación I", desbloquea: ["form2"] },
      { id: "financiero", nombre: "Análisis financiero", requisitos: ["matematica"] },
      { id: "opt1", nombre: "Optativo I disciplinar" }
    ]
  },
  {
    ciclo: "Nivel 3 - Ciclo 2",
    materias: [
      { id: "practica2", nombre: "Práctica planificación y promoción II", requisitos: ["practica1"], desbloquea: ["practica3"] },
      { id: "form2", nombre: "Formulación y evaluación II", requisitos: ["form1"], desbloquea: ["evaluacion"] },
      { id: "gestion", nombre: "Planificación y gestión territorial", requisitos: ["fundamentos"], desbloquea: ["local"] },
      { id: "macro", nombre: "Macroeconomía para planificación", requisitos: ["micro"], desbloquea: ["politica"] },
      { id: "opt2", nombre: "Optativo II disciplinar" }
    ]
  },
  {
    ciclo: "Nivel 4 - Ciclo 1",
    materias: [
      { id: "local", nombre: "Planificación local (urbano-rural)", requisitos: ["gestion"] },
      { id: "politica", nombre: "Economía política para la planificación", requisitos: ["macro"] },
      { id: "evaluacion", nombre: "Evaluación social de planes", requisitos: ["form2"] },
      { id: "practica3", nombre: "Práctica planificación y promoción III", requisitos: ["practica2"], desbloquea: ["practica4"] },
      { id: "opt3", nombre: "Optativo III disciplinar" }
    ]
  },
  {
    ciclo: "Nivel 4 - Ciclo 2",
    materias: [
      { id: "impacto", nombre: "Evaluación del impacto ambiental" },
      { id: "prospectiva", nombre: "Planificación y prospectiva", requisitos: ["estrategica"] },
      { id: "diseno", nombre: "Diseño de investigación" },
      { id: "practica4", nombre: "Práctica planificación y promoción IV", requisitos: ["practica3"] },
      { id: "opt4", nombre: "Optativo IV libre" },
      { id: "riesgos", nombre: "Evaluación y gestión de riesgos organizacionales" }
    ]
  }
];

const malla = document.getElementById("malla");
const estado = {};

niveles.forEach(nivel => {
  const columna = document.createElement("div");
  columna.className = "semestre";

  const titulo = document.createElement("h2");
  titulo.textContent = nivel.ciclo;
  columna.appendChild(titulo);

  nivel.materias.forEach(m => {
    const div = document.createElement("div");
    div.className = "materia";
    div.textContent = m.nombre;
    div.dataset.id = m.id;
    div.onclick = () => aprobar(m.id);

    estado[m.id] = {
      aprobada: false,
      requisitos: m.requisitos || [],
      desbloquea: m.desbloquea || [],
      div
    };

    if (!m.requisitos || m.requisitos.length === 0) {
      desbloquear(m.id);
    }

    columna.appendChild(div);
  });

  malla.appendChild(columna);
});

function desbloquear(id) {
  const m = estado[id];
  if (!m.aprobada) m.div.classList.add("desbloqueada");
}

function aprobar(id) {
  const m = estado[id];
  if (m.aprobada) return;

  m.aprobada = true;
  m.div.classList.remove("desbloqueada");
  m.div.classList.add("aprobada");
  m.div.onclick = null;

  for (const clave in estado) {
    const r = estado[clave];
    if (!r.aprobada && r.requisitos.every(req => estado[req].aprobada)) {
      desbloquear(clave);
    }
  }
}
