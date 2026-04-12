const Cta = () => {
  return (
    <section className="bg-primary relative py-12 overflow-hidden">
      {/* LIGHTER TRI TOP-R */}
      <div className="hidden md:block bg-white/20 absolute top-0 right-0 -rotate-45 w-44 h-44" />

      <div className="container">
        {/* CONTENT  */}
        <div>
          <h1 className="heading-1 text-white font-bold">
            Integrate Our Clinical Expertise <br />
            Into Your HealthCare Network.
          </h1>
          <div className="flex gap-2 mt-4">
            <button className="btn btn-secondary">
              Request Institutional Portal
            </button>
            <button className="btn btn-outline text-white">
              Speak with Director
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
