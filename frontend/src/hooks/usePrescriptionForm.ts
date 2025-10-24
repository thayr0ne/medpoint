import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Prescription, PrescriptionItem } from "@/types/prescription";
import { prescriptionSchema } from "@/lib/validation/prescription-schema";
import { prescriptionService } from "@/services/prescription-service";
import { prescriptionModelService } from "@/services/prescription-model-service";

export type PrescriptionFormContext = "admission" | "evolution" | "model";

export const usePrescriptionForm = (
  patientId?: string,
  modelId?: string,
  context: PrescriptionFormContext = "admission"
) => {
  const [activeTab, setActiveTab] = useState("patient-info");
  const [activeCategory, setActiveCategory] = useState("medication");
  const [isEditingItem, setIsEditingItem] = useState<number | null>(null);

  const form = useForm<z.infer<typeof prescriptionSchema>>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patient: {
        name: "",
        recordNumber: "",
        age: undefined,
        weight: undefined,
        bed: "",
        diagnosis: "",
        cids: [],
        allergies: ""
      },
      prescription: [],
      temporary: {}
    }
  });

  useEffect(() => {
    if (!modelId) return;
    prescriptionModelService
      .getById(modelId)
      .then((model) => {
        form.setValue("prescription", model.items);
      })
      .catch(() => toast.error("Não foi possível carregar o modelo selecionado"));
  }, [form, modelId]);

  useEffect(() => {
    if (!patientId) return;
    prescriptionService
      .getByPatient(patientId)
      .then((prescriptions) => {
        if (!prescriptions.length) return;
        const latest = prescriptions[0];
        form.setValue("patient.name", latest.patientName);
        form.setValue("patient.recordNumber", latest.recordNumber);
        form.setValue("patient.diagnosis", latest.diagnosis ?? "");
        form.setValue("patient.cids", latest.cids ?? []);
      })
      .catch(() => toast.error("Não foi possível carregar dados do paciente"));
  }, [form, patientId]);

  const handleAddItem = (item: PrescriptionItem) => {
    const currentItems = form.getValues("prescription") ?? [];
    form.setValue("prescription", [...currentItems, item]);
    toast.success("Item adicionado à prescrição");
  };

  const handleEditItem = (index: number) => {
    setIsEditingItem(index);
  };

  const handleUpdateItem = (index: number, item: PrescriptionItem) => {
    const items = [...(form.getValues("prescription") ?? [])];
    items[index] = item;
    form.setValue("prescription", items);
    setIsEditingItem(null);
    toast.success("Item atualizado");
  };

  const handleRemoveItem = (index: number) => {
    const items = (form.getValues("prescription") ?? []).filter((_, i) => i !== index);
    form.setValue("prescription", items);
    toast.success("Item removido");
  };

  const onSubmit = async (values: z.infer<typeof prescriptionSchema>) => {
    try {
      const payload: Prescription = {
        id: crypto.randomUUID(),
        patientId: patientId ?? crypto.randomUUID(),
        patientName: values.patient.name,
        recordNumber: values.patient.recordNumber,
        date: new Date().toISOString(),
        prescriberId: "",
        prescriberName: "",
        prescriberCRM: "",
        items: values.prescription ?? [],
        diagnosis: values.patient.diagnosis,
        cids: values.patient.cids,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await prescriptionService.create(payload);
      toast.success("Prescrição salva com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar prescrição");
    }
  };

  return useMemo(
    () => ({
      form,
      activeTab,
      setActiveTab,
      activeCategory,
      setActiveCategory,
      isEditingItem,
      context,
      handleAddItem,
      handleEditItem,
      handleUpdateItem,
      handleRemoveItem,
      onSubmit
    }),
    [activeCategory, activeTab, context, form, isEditingItem]
  );
};
