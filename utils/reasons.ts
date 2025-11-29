export const generateReasons = (): string[] => {
  const baseReasons = [
    "Seu sorriso ilumina meus dias",
    "A paz que você me traz",
    "Como você me entende sem palavras",
    "Seus abraços que curam tudo",
    "A forma como sonhamos juntos",
    "Sua risada contagiante",
    "Como você é minha companheira",
    "A leveza do nosso amor",
    "Seus olhos que falam comigo",
    "Como tornamos tudo especial juntos",
    "Sua força e sua delicadeza",
    "A nossa cumplicidade única",
    "O jeito que você dorme",
    "Como você faz café pela manhã",
    "Seus pequenos gestos de carinho",
    "A forma como você me olha",
    "Como você me faz rir",
    "Sua voz ao telefone",
    "O cheiro do seu perfume",
    "Como você dança comigo",
    "Seus beijos de bom dia",
    "A forma como você me acalma",
    "Como você sonha acordada",
    "Seu jeito de contar histórias",
    "A forma como você me apoia",
    "Como você faz planos comigo",
    "Sua maneira única de amar",
    "O brilho nos seus olhos",
    "Como você me faz sentir especial",
    "Seus abraços apertados",
    "A forma como você ri das minhas piadas",
    "Como você cuida de mim",
    "Seu jeito de ser romântica",
    "A forma como você me surpreende",
    "Como você torna tudo melhor",
    "Sua paciência comigo",
    "O jeito que você me beija",
    "Como você compartilha seus sonhos",
    "Sua forma de demonstrar amor",
    "Como você me inspira",
    "Seu coração generoso",
    "A forma como você me escuta",
    "Como você me faz sentir em casa",
    "Seus pequenos carinhos",
    "A forma como você confia em mim",
    "Como você torna os dias especiais",
    "Seu jeito de ser única",
    "A forma como você me ama",
    "Como você faz tudo ter sentido",
    "Sua presença em minha vida"
  ];

  const variations = [
    "o jeito", "a forma", "como", "quando", "sua maneira de", "o modo que", "a maneira como",
    "seu", "sua", "seus", "suas", "nosso", "nossa", "nossos", "nossas"
  ];

  const actions = [
    "me olha", "sorri", "fala", "caminha", "dança", "canta", "respira", "dorme",
    "acorda", "come", "bebe", "ri", "chora", "pensa", "sonha", "trabalha",
    "estuda", "brinca", "abraça", "beija", "toca", "segura minha mão",
    "me escuta", "me entende", "me ama", "me cuida", "me protege", "me inspira"
  ];

  const qualities = [
    "linda", "especial", "única", "perfeita", "incrível", "maravilhosa", "extraordinária",
    "gentil", "carinhosa", "doce", "forte", "inteligente", "engraçada", "corajosa",
    "determinada", "sensível", "compreensiva", "paciente", "generosa", "romântica"
  ];

  const moments = [
    "de manhã", "à tarde", "à noite", "quando chove", "quando faz sol", "no inverno",
    "no verão", "aos domingos", "nos finais de semana", "durante a semana",
    "quando estamos juntos", "quando estamos longe", "em silêncio", "conversando"
  ];

  const reasons: string[] = [...baseReasons];

  // Gerar razões combinando elementos
  for (let i = 0; i < 4950; i++) {
    const variation = variations[Math.floor(Math.random() * variations.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const quality = qualities[Math.floor(Math.random() * qualities.length)];
    const moment = moments[Math.floor(Math.random() * moments.length)];
    
    const templates = [
      `${variation} você ${action}`,
      `Como você é ${quality}`,
      `Quando você ${action} ${moment}`,
      `Sua forma ${quality} de ${action}`,
      `O jeito ${quality} que você ${action}`,
      `Como você ${action} de forma tão ${quality}`,
      `Sua maneira ${quality} de ser`,
      `Quando você ${action} e fica ${quality}`,
      `O modo ${quality} como você ${action}`,
      `Como você faz tudo ser ${quality}`,
      `Sua ${quality} forma de viver`,
      `O jeito que você torna tudo ${quality}`,
      `Como você é naturalmente ${quality}`,
      `Sua presença ${quality} ${moment}`,
      `O modo como você ${action} comigo`,
      `Como você sempre é tão ${quality}`,
      `Sua forma única de ${action}`,
      `O jeito especial que você ${action}`,
      `Como você me faz sentir ${quality}`,
      `Quando você ${action} e sorri`
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    reasons.push(template);
  }

  return reasons.slice(0, 5000);
};