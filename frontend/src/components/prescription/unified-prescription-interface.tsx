import { FormProvider } from "react-hook-form";
import { PrescriptionTabs } from "./prescription-tabs";
import { usePrescriptionForm, PrescriptionFormContext } from "@/hooks/usePrescriptionForm";
import { Button } from "@/components/ui/button";

interface UnifiedPrescriptionInterfaceProps {
  patientId?: string;
  modelId?: string;
  context?: PrescriptionFormContext;
}

export const UnifiedPrescriptionInterface: React.FC<UnifiedPrescriptionInterfaceProps> = ({
  patientId,
  modelId,
  context = "admission"
}) => {
  const prescriptionForm = usePrescriptionForm(patientId, modelId, context);
  const { form: methods, onSubmit, context: _formContext, ...rest } = prescriptionForm;

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Prescrição Médica</h1>
            <p className="text-sm text-muted-foreground">
              {context === "admission"
                ? "Fluxo de admissão inicial"
                : context === "evolution"
                  ? "Prescrição em evolução diária"
                  : "Edição de modelo institucional"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button type="submit">Salvar prescrição</Button>
          </div>
        </div>
        <PrescriptionTabs form={methods} {...rest} />
      </form>
    </FormProvider>
  );
};
