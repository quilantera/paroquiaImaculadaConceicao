import ejcBanner from "@/assets/padre-beto.jpg";
import ejcFundo from "@/assets/ejc-fundo.jpg";
import Image from "next/image";
export default function EJC() {
  return (
    <main className="relative min-h-screen  flex flex-col items-center justify-center md:justify-start md:pt-14 bg-slate-950">
      {/* Banner */}
   
      {/* Título */}
        <Image src={ejcFundo} className="fixed top-0 left-0 w-screen h-screen z-0 object-cover opacity-10" alt="background" width={1080} height={1080}/>
      <div className="absolute md:fixed bottom-12 right-16 md:bottom-10 md:right-8  ">
      <div className="relative md:hidden  overflow-hidden h-[90vh] w-[30vw] md:h-[50vh] md:w-[60vw]">
        <Image src={ejcBanner}  className="  absolute inset-0 h-full w-full md:w-auto object-cover opacity-70" alt="padre beto" height={1300} width={700}/>
        <div className="absolute inset-0 bg-gradient-to-t  from-gray-950 to-transparent"></div>
</div>
     </div>

      {/* Conteúdo principal */}
      <section className="flex w-full md:flex-col md:items-center md:px-[8%] md:gap-1 z-20 justify-center   gap-6 py-10">
     
        {/* Informações e vídeo */}
        <div className="flex flex-col w-2/5 gap-3  md:w-full md:justify-center md:items-center  ">
          <h1 className=" font-bold text-5xl md:font-alt animate-fade-in-left font-alt md:text-3xl md:text-center">
          ENCONTRO DE JOVENS COM CRISTO 2024
          </h1>
          <h3 className="font-semibold text-xl  animate-fade-in-left md:text-base md:text-center ">Paróquia Imaculada Conceição - jd Dracena</h3>
           <h2 className=" font-sans mt-10 hidden  opacity-0 md:block animate-fade-in-left3 font-bold text-4xl md:text-2xl text-end px-10 md:px-4 "> DIAS 27 E 28 DE JULHO</h2>
          {/* Corrigindo a tag do vídeo */}
          <a
        href="https://forms.gle/Q6HrvxWDdxWn9h2n8"
        className="hover:bg-slate-50 border-4 mt-10 md:my-10 md:text-lg  md:font-bold  opacity-0 animate-fade-in-left2 border-slate-100 w-fit font-sans font-semibold duration-300  rounded decoration-none p-4 text-2xl hover:text-gray-900"
      >
        INSCREVA-SE AGORA
      </a>
        </div>
        <div className="w-2/5 z-20 md:w-full md:flex md:justify-center " >
          <div className="md:hidden bg-white opacity-0 border-4 text-slate-900 border-white  animate-fade-in-down h-[30vh] w-[350px] flex items-center justify-center hover:bg-transparent hover:text-white duration-300">
            <h2 className=" font-sans   font-bold text-4xl ext-end px-10 md:px-4 "> DIAS 27 E 28 DE JULHO</h2>
          </div>
        </div>
      </section>

      {/* Botão de inscrição */}
    

      {/* Citação */}
      <div className="absolute bottom-20  right-20 w-72 flex flex-col md:static md:w-[50vw] md:mr-6 md:self-end md:z-20">
        <p className="text-xl md:text-sm text-justify pb-2">
        &quot;Procure conformar-se com a vontade de Deus sempre e em tudo, e não
          tenha medo! &quot;
        </p>
        <p className="text-right  md:text-sm text-lg">Padre Pio</p>
      </div>
      <p className="fixed bottom-3 left-4 md:static md:w-[90vw]  md:hidden  md:pt-10  z-20"> Rua Capivari Mirim, 444 - Jd. Dracena, São Paulo, SP, Brazil</p>
    </main>
  );
}
