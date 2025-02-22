
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BrandCardProps {
  name: string;
  logo: string;
  category: string;
  budget: string;
  deadline: string;
}

export const BrandCard = ({
  name,
  logo,
  category,
  budget,
  deadline,
}: BrandCardProps) => {
  return (
    <Button 
      variant="ghost" 
      className="p-0 h-auto w-full hover:bg-transparent"
      onClick={() => {
        // We'll just log for now, but this could open a modal or navigate to a detail page
        console.log(`Clicked on brand: ${name}`);
      }}
    >
      <Card className="w-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center">
              <img src={logo} alt={name} className="h-8 w-8 object-contain" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-neutral-500">{category}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Budget</span>
              <span className="font-medium">{budget}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Deadline</span>
              <span className="font-medium">{deadline}</span>
            </div>
          </div>
        </div>
      </Card>
    </Button>
  );
};
