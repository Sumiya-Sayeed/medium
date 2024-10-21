const Quote = () => {
  return (
    <div className='h-screen bg-slate-200 flex gap-5 justify-center flex-col w-[100%] lg:p-40 md:p-20'>
      <div className='w-[100%] text-3xl font-bold'>
        "The customer support I receive was exceptional. The support team went
        above and beyond to address my concerns."
      </div>
      <div className='w-[100%] text-xl font-semibold'>Julies Winfield</div>
      <div className='w-[100%] text-sm font-normal text-slate-500'>
        CEO | ACME Corp
      </div>
    </div>
  );
};

export default Quote;
