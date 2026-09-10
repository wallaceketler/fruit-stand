import nameIcon from '@/assets/name.png'
import priceIcon from '@/assets/price.png'
import quantityIcon from '@/assets/quantity.png'
import { RedButton } from '@/components/RedButton/RedButton'
import { Input } from '@/components/ui/input'
import type { FruitInput } from '@/features/fruits/fruit'
import { imageSrc } from '@/lib/image-src'
import { LoaderCircle } from 'lucide-react'
import {
  useRef,
  useState,
  type ChangeEvent,
  type CompositionEvent,
  type FormEventHandler,
} from 'react'

interface FruitFormProps {
  initialValues?: FruitInput
  isSubmitting?: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
  submitLabel: string
}

interface FieldProps {
  defaultValue?: string
  disabled?: boolean
  hint: string
  icon: typeof nameIcon
  inputMode?: 'decimal' | 'numeric' | 'text'
  label: string
  maxLength?: number
  name: keyof FruitInput
  pattern: string
  placeholder: string
  sanitize: (value: string) => string
}

function sanitizeName(value: string) {
  return value.normalize('NFC').replace(/[^\p{L}\p{M}\s]/gu, '')
}

function sanitizePrice(value: string) {
  const sanitized = value.replace(/[^0-9,]/g, '')
  const [integer, ...decimalParts] = sanitized.split(',')

  if (!integer) {
    return ''
  }

  if (!sanitized.includes(',')) {
    return integer
  }

  return `${integer},${decimalParts.join('').slice(0, 2)}`
}

function sanitizeQuantity(value: string) {
  return value.replace(/\D/g, '')
}

function Field({
  defaultValue,
  disabled,
  hint,
  icon,
  inputMode = 'text',
  label,
  maxLength,
  name,
  pattern,
  placeholder,
  sanitize,
}: FieldProps) {
  const [value, setValue] = useState(defaultValue ?? '')
  const isComposing = useRef(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isComposing.current) {
      setValue(event.target.value)
      return
    }

    setValue(sanitize(event.target.value))
  }

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    isComposing.current = false
    setValue(sanitize(event.currentTarget.value))
  }

  return (
    <label className="block" htmlFor={name}>
      <span className="mb-2 flex items-end justify-between gap-3">
        <span className="text-sm font-black">{label}</span>
        <span className="text-right text-xs font-semibold text-muted-foreground">
          {hint}
        </span>
      </span>
      <span className="relative block">
        <span className="absolute top-1/2 left-2 z-10 grid size-9 -translate-y-1/2 place-items-center overflow-hidden rounded-lg border-2 border-foreground bg-muted">
          <img
            alt=""
            aria-hidden="true"
            className="asset-blend size-7 object-contain"
            src={imageSrc(icon)}
          />
        </span>
        <Input
          className="pl-13"
          disabled={disabled}
          id={name}
          inputMode={inputMode}
          maxLength={maxLength}
          name={name}
          pattern={pattern}
          placeholder={placeholder}
          onCompositionEnd={handleCompositionEnd}
          onCompositionStart={() => {
            isComposing.current = true
          }}
          onChange={handleChange}
          required
          value={value}
        />
      </span>
    </label>
  )
}

export function FruitForm({
  initialValues,
  isSubmitting = false,
  onSubmit,
  submitLabel,
}: FruitFormProps) {
  return (
    <form aria-busy={isSubmitting} className="space-y-5" onSubmit={onSubmit}>
      <Field
        defaultValue={initialValues?.name}
        disabled={isSubmitting}
        hint="até 26 caracteres"
        icon={nameIcon}
        label="Nome"
        maxLength={26}
        name="name"
        pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s]+"
        placeholder="Nome da fruta"
        sanitize={sanitizeName}
      />
      <Field
        defaultValue={initialValues?.price}
        disabled={isSubmitting}
        hint="valor por quilo"
        icon={priceIcon}
        inputMode="decimal"
        label="Preço"
        name="price"
        pattern="[0-9]+(,[0-9]{1,2})?"
        placeholder="Preço do Kilo"
        sanitize={sanitizePrice}
      />
      <Field
        defaultValue={initialValues?.quantity}
        disabled={isSubmitting}
        hint="unidades disponíveis"
        icon={quantityIcon}
        inputMode="numeric"
        label="Estoque"
        name="quantity"
        pattern="[0-9]+"
        placeholder="Quantidade no estoque"
        sanitize={sanitizeQuantity}
      />
      <div className="pt-2">
        <RedButton disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
              Salvando...
            </>
          ) : (
            submitLabel
          )}
        </RedButton>
      </div>
    </form>
  )
}
