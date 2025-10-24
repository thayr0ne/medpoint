const categories = [
  { id: "medication", label: "Medicamentos" },
  { id: "antimicrobial", label: "Antimicrobianos" },
  { id: "vasoactive", label: "Vasoativos" },
  { id: "sedation", label: "Sedação" },
  { id: "hydration", label: "Hidratação" },
  { id: "diet", label: "Dieta" },
  { id: "care", label: "Cuidados" }
] as const;

interface PrescriptionCategorySelectorProps {
  activeCategory: string;
  onSelect: (category: string) => void;
}

export const PrescriptionCategorySelector: React.FC<PrescriptionCategorySelectorProps> = ({
  activeCategory,
  onSelect
}) => {
  return (
    <aside className="rounded-lg border border-border bg-background p-4 shadow-soft">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Categorias</p>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`w-full rounded-md px-4 py-2 text-left text-sm font-medium transition ${
              activeCategory === category.id
                ? "bg-accent text-accent-foreground shadow-soft"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </aside>
  );
};
