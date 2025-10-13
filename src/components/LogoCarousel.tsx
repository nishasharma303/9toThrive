import { InfiniteSlider } from "@/components/ui/infinite-slider";

const companies = [
  "Google", "IBM", "Microsoft", "Apple", "Amazon", "Flipkart", 
  "Oracle", "Meta", "Tesla", "GitHub", "Citibank", "BNY",
  "Netflix", "Pinterest", "Barclays", "JPMorgan", "Intel", "Cisco",
  "Adobe", "Accenture", "TCS", "Tata", "Capgemini", "Reliance",
  "Uber", "Ola", "Swiggy"
];

const LogoCarousel = () => {
  return (
    <section className="py-16" style={{ backgroundColor: '#011627ff' }}>
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12" style={{ color: '#e25c28ff' }}>
          Trusted by Leading Companies
        </h3>
        <InfiniteSlider gap={48} duration={40} reverse className="w-full">
          {companies.map((company) => (
            <div
              key={company}
              className="flex items-center justify-center px-8 py-4 rounded-lg min-w-[180px]"
              style={{ 
                backgroundColor: 'rgba(226, 92, 40, 0.1)',
                border: '1px solid rgba(226, 92, 40, 0.2)'
              }}
            >
              <span className="text-xl font-bold whitespace-nowrap" style={{ color: '#e25c28ff' }}>
                {company}
              </span>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
};

export default LogoCarousel;