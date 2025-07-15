const materias = [
  // NIVEL 1
  { id: "teoria", nombre: "Teoría de la organización", requisitos: [] },
  { id: "paradigmas", nombre: "Paradigmas y enfoques de investigación", requisitos: [] },
  { id: "economia", nombre: "Economía general para planificación", requisitos: [] },
  { id: "matematica", nombre: "Matemática financiera", requisitos: [] },

  { id: "estructuras", nombre: "Estructuras, actores y movimientos sociales", requisitos: [] },
  { id: "fundamentos", nombre: "Fundamentos de planificación", requisitos: [] },
  { id: "metodos", nombre: "Métodos y técnicas de investigación", requisitos: ["paradigmas"] },
  { id: "contabilidad", nombre: "Contabilidad", requisitos: ["matematica"] },

  // NIVEL 2
  { id: "genero", nombre: "Género y desarrollo", requisitos: ["estructuras"] },
  { id: "estad1", nombre: "Estadística para planificadores I", requisitos: [] },
  { id: "presupuesto", nombre: "Planificación y presupuesto", requisitos: ["contabilidad"] },
  { id: "admin", nombre: "Principios de administración", requisitos: [] },
  { id: "idioma1", nombre: "Idioma integrado I", requisitos: [] },

  { id: "micro", nombre: "Microeconomía para planificación", requisitos: ["economia"] },
  { id: "idioma2", nombre: "Idioma integrado II", requisitos: ["idioma1"] },
  { id: "comunicacion", nombre: "Procesos de comunicación y grupos", requisitos: [] },
  { id: "estad2", nombre: "Estadística para planificación II", requisitos: ["estad1"] },
  { id: "diagnostico", nombre: "Diagnóstico y acción comunitaria", requisitos: ["metodos"] },

  // NIVEL 3
  { id: "practica1", nombre: "Práctica planificación y promoción I", requisitos: ["diagnostico"] },
  { id: "estrategica", nombre: "Planificación estratégica", requisitos: ["fundamentos"] },
  { id: "formulacion1", nombre: "Formulación y evaluación I", requisitos: [] },
  { id: "financiero", nombre: "Análisis financiero", requisitos: ["matematica"] },
  { id: "opt1", nombre: "Optativo I disciplinar", requisitos: [] },

  { id: "practica2", nombre: "Práctica planificación y promoción II", requisitos: ["practica1"] },
  { id: "formulacion2", nombre: "Formulación y evaluación II", requisitos: ["formulacion1"] },
  { id: "gestion", nombre: "Planificación y gestión territorial", requisitos: ["fundamentos"] },
  { id: "macro", nombre: "Macroeconomía para planificación", requisitos: ["micro"] },
  { id: "opt2", nombre: "Optativo II disciplinar", requisitos: [] },

  // NIVEL 4
  { id: "local", nombre: "Planificación local (urbano-rural)", requisitos: ["gestion"] },
  { id: "politica", nombre: "Economía política para la planificación", requisitos: ["macro"] },
  { id: "evaluacion", nombre: "Evaluación social de planes", requisitos: ["formulacion2"] },
  { id: "practica3", nombre: "Práctica planificación y promoción III", requisitos: ["practica2"] },
  { id: "opt3", nombre: "Optativo III disciplinar", requisitos: [] },

  { id: "impacto", nombre: "Evaluación del impacto ambiental", requisitos: [] },
  { id: "prospectiva", nombre: "Planificación y prospectiva", requisitos: ["estrategica"] },
  { id: "diseno", nombre: "Diseño de investigación", requisitos: [] },
  { id: "practica4", nombre: "Práctica planificación y promoción IV", requisitos: ["practica3"] },
  { id: "opt4", nombre: "Optativo IV libre", requisitos: [] },
  { id: "riesgos", nombre: "Evaluación y gestión de riesgos", requisitos: [] },
];

const malla = document.getElementById("malla");

const estadoMaterias = {};

function crearMateria(m) {
  const div = document.createElement("div");
  div.classList.add("materia");
  div.id = m.id;

  const titulo = document.createElement("h3");
  titulo.textContent = m.nombre;

  const requisitos = document.createElement("small");
  requisitos.textContent = m.requisitos.length > 0
    ? "Requiere: " + m.requisitos.map(id => materias.find(x => x.id === id).nombre).join(", ")
    : "Sin requisitos";

  div.appendChild(titulo);
  div.appendChild(requisitos);

  malla.appendChild(div);
  estadoMaterias[m.id] = { aprobada: false, div, requisitos: m.requisitos };

  if (m.requisitos.length === 0) {
    desbloquearMateria(m.id);
  }
}

function desbloquearMateria(id) {
  const mat = estadoMaterias[id];
  if (!mat.aprobada) {
    mat.div.classList.add("desbloqueada");
    mat.div.addEventListener("click", () => aprobarMateria(id));
  }
}

function aprobarMateria(id) {
  const mat = estadoMaterias[id];
  if (mat.aprobada) return;

  mat.aprobada = true;
  mat.div.classList.remove("desbloqueada");
  mat.div.classList.add("aprobada");

  // Desbloquear las que dependan de esta
  materias.forEach(m => {
    if (!estadoMaterias[m.id].aprobada) {
      const cumplidos = m.requisitos.every(req => estadoMaterias[req]?.aprobada);
      if (cumplidos) desbloquearMateria(m.id);
    }
  });
}

// Crear la malla
materias.forEach(crearMateria);

