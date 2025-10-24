import { PrescriptionItem } from "@/types/prescription";
import { Button } from "@/components/ui/button";

interface PrescriptionItemListProps {
  items: PrescriptionItem[];
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

const categoryLabel: Record<PrescriptionItem["category"], string> = {
  medication: "Medicamentos",
  antimicrobial: "Antimicrobianos",
  vasoactive: "Vasoativos",
  sedation: "Sedação",
  hydration: "Hidratação",
  diet: "Dieta",
  care: "Cuidados"
};

export const PrescriptionItemList: React.FC<PrescriptionItemListProps> = ({ items, onEdit, onRemove }) => {
  return (
    <aside className="rounded-lg border border-border bg-background p-4 shadow-soft">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">Itens adicionados</p>
        <p className="text-xs text-muted-foreground">Gerencie os itens da prescrição em tempo real</p>
      </div>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-xs text-muted-foreground">Nenhum item adicionado</p>}
        {items.map((item, index) => (
          <div key={item.id} className="rounded-lg border border-border bg-card/60 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{item.medication}</p>
                <p className="text-xs text-muted-foreground">{categoryLabel[item.category]}</p>
                {"dose" in item && item.dose && (
                  <p className="text-xs text-muted-foreground">Dose: {item.dose}</p>
                )}
                {item.notes && <p className="text-xs text-muted-foreground">Notas: {item.notes}</p>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" type="button" onClick={() => onEdit(index)}>
                  Editar
                </Button>
                <Button size="sm" variant="destructive" type="button" onClick={() => onRemove(index)}>
                  Remover
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
