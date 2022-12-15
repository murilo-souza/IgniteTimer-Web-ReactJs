import { useForm } from 'react-hook-form'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Infome a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'Intervalo minimo é de 5 minutos')
    .max(90, 'Intervalo máximo é de 90 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-sugestion"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-sugestion">
        <option value="Projeto 1" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={90}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
