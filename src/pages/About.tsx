function About() {
  const aboutText =
    "Descubra a moda única da Vox Clothing!\n\nA Vox Clothing é a loja perfeita para quem busca peças de roupa incríveis e estilosas. Temos as últimas tendências da moda, cuidadosamente selecionadas para atender ao seu estilo pessoal.\n\nNossas roupas são de alta qualidade e confeccionadas com os melhores materiais, garantindo conforto e durabilidade. Ao usar uma peça da Vox Clothing, você se sentirá confiante e elegante em qualquer ocasião.\n\nNossa equipe de consultores de moda está sempre pronta para ajudá-lo(a) a encontrar o look perfeito. Com seu conhecimento e paixão pela moda, eles podem orientar você na escolha das melhores combinações para criar um visual único e deslumbrante.\n\nAlém disso, valorizamos a fidelidade dos nossos clientes. Oferecemos benefícios exclusivos, como descontos especiais e acesso antecipado a novas coleções, para mostrar o quanto apreciamos você.\n\nVenha nos visitar na Vox Clothing e descubra a moda que vai te destacar. Estamos ansiosos para receber você e ajudá-lo(a) a encontrar peças incríveis que combinam com o seu estilo e personalidade.\n\nVox Clothing - O seu destino para um estilo único!";

  console.log(aboutText);

  return (
    <div className="flex grow items-center justify-center">
      <div className="h-full max-w-[40rem] gap-2 p-2">
        <h2 className="flex w-fit items-center border-r-4 border-orange-200 pr-2 text-xl font-bold uppercase tracking-widest">
          Vox Clothing
        </h2>
        <div className="whitespace-pre-line">{aboutText}</div>
      </div>
    </div>
  );
}

export default About;
