export interface Exame {
  id: number;
  nome: string;
  descricao: string;
}

export const examesMock: Exame[] = [
  { id: 1, nome: "Hemograma Completo", descricao: "Avaliação hematológica geral (séries vermelha, branca e plaquetária)." },
  { id: 2, nome: "Glicemia de Jejum", descricao: "Dosagem de glicose plasmática para rastreio de diabetes." },
  { id: 3, nome: "Raio-X de Tórax", descricao: "Imagem radiográfica para avaliação pulmonar e cardíaca." },
  { id: 4, nome: "Tomografia de Crânio", descricao: "TC sem contraste para investigação neurológica de urgência." },
  { id: 5, nome: "Eletrocardiograma (ECG)", descricao: "Registro da atividade elétrica do coração em 12 derivações." },
  { id: 6, nome: "Ultrassonografia Abdominal", descricao: "Avaliação ultrassonográfica dos órgãos abdominais." },
  { id: 7, nome: "Troponina", descricao: "Marcador laboratorial de lesão miocárdica." },
  { id: 8, nome: "PCR (Proteína C Reativa)", descricao: "Marcador inflamatório de fase aguda." },
  { id: 9, nome: "TSH e T4 Livre", descricao: "Avaliação da função tireoidiana." },
  { id: 10, nome: "Urina Tipo I (EAS)", descricao: "Análise física, química e sedimentoscopia urinária." },
  { id: 11, nome: "Ressonância Magnética Lombar", descricao: "Avaliação detalhada da coluna lombossacra." },
  { id: 12, nome: "Gasometria Arterial", descricao: "Análise do equilíbrio ácido-base e oxigenação." },
];
