import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { PrescriptionFormValues } from "@/lib/validation/prescription-schema";
import { PrescriptionCategorySelector } from "../category-selector";
import { PrescriptionItemForm } from "../category-form";
import { PrescriptionItemList } from "../category-item-list";
import { PrescriptionItem } from "@/types/prescription";

interface PrescriptionItemsTabProps {
  form: UseFormReturn<PrescriptionFormValues>;
  activeCategory: string;
  onChangeCategory: (category: string) => void;
  onAddItem: (item: PrescriptionItem) => void;
  onEditItem: (index: number) => void;
  onUpdateItem: (index: number, item: PrescriptionItem) => void;
  onRemoveItem: (index: number) => void;
  editingIndex: number | null;
}

export const PrescriptionItemsTab: React.FC<PrescriptionItemsTabProps> = ({
  form,
  activeCategory,
  onChangeCategory,
  onAddItem,
  onEditItem,
  onUpdateItem,
  onRemoveItem,
  editingIndex
}) => {
  const items = form.watch("prescription") ?? [];
  const editingItem = useMemo(() => (editingIndex !== null ? items[editingIndex] : undefined), [
    editingIndex,
    items
  ]);

  return (
    <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
      <PrescriptionCategorySelector activeCategory={activeCategory} onSelect={onChangeCategory} />
      <PrescriptionItemForm
        form={form}
        category={activeCategory}
        onAddItem={onAddItem}
        onUpdateItem={(item) => editingIndex !== null && onUpdateItem(editingIndex, item)}
        editingItem={editingItem}
        isEditing={editingIndex !== null}
      />
      <PrescriptionItemList items={items} onEdit={onEditItem} onRemove={onRemoveItem} />
    </div>
  );
};
