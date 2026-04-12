import Link from "next/link";

const Cta = () => {
  return (
    <section className="bg-primary relative py-12 overflow-hidden">
      {/* LIGHTER TRI TOP-R */}
      <div className="bg-white/20 absolute top-0 right-0 -rotate-45 w-44 h-44" />

      <div className="container">
        {/* CONTENT  */}
        <div>
          <h1 className="heading-1 text-white font-bold text-center md:text-left">
            Integrate Our Clinical Expertise <br />
            Into Your HealthCare Network.
          </h1>
          <div className="flex gap-2 mt-4">
            <Link href={'/contact'} className="btn btn-secondary">
              Request Institutional Portal
            </Link>
            <Link href={'/contact'} className="btn btn-outline text-white">
              Speak with Director
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
