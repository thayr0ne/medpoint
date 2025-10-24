import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientInfoTab } from "./tabs/patient-info-tab";
import { PrescriptionItemsTab } from "./tabs/prescription-items-tab";
import { PrescriptionPreviewTab } from "./tabs/prescription-preview-tab";
import { UseFormReturn } from "react-hook-form";
import { PrescriptionFormValues } from "@/lib/validation/prescription-schema";
import { PrescriptionItem } from "@/types/prescription";

export interface PrescriptionTabsProps {
  form: UseFormReturn<PrescriptionFormValues>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  handleAddItem: (item: PrescriptionItem) => void;
  handleEditItem: (index: number) => void;
  handleUpdateItem: (index: number, item: PrescriptionItem) => void;
  handleRemoveItem: (index: number) => void;
  isEditingItem: number | null;
}

export const PrescriptionTabs: React.FC<PrescriptionTabsProps> = ({
  form,
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  handleAddItem,
  handleEditItem,
  handleUpdateItem,
  handleRemoveItem,
  isEditingItem
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="patient-info">Dados do paciente</TabsTrigger>
        <TabsTrigger value="items">Itens da prescrição</TabsTrigger>
        <TabsTrigger value="preview">Visualização</TabsTrigger>
      </TabsList>
      <TabsContent value="patient-info">
        <PatientInfoTab form={form} />
      </TabsContent>
      <TabsContent value="items">
        <PrescriptionItemsTab
          form={form}
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          onAddItem={handleAddItem}
          onEditItem={handleEditItem}
          onUpdateItem={handleUpdateItem}
          onRemoveItem={handleRemoveItem}
          editingIndex={isEditingItem}
        />
      </TabsContent>
      <TabsContent value="preview">
        <PrescriptionPreviewTab form={form} />
      </TabsContent>
    </Tabs>
  );
};
