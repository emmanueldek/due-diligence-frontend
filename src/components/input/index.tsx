import { useState } from "react";
import { TbEyeOff, TbEye } from "react-icons/tb";

interface ICheckBoxProps {
  id: string;
  className?: string;
  text: string;
  link?: string;
  linkText?: string;
}

export const InputCheckBox = ({ id, text, link, linkText, className }: ICheckBoxProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input id={id} type="checkbox" value="" className="w-4 h-4 accent-grey-900 rounded bg-transparent" />
      <div className="ml-2 text-sm font-light text-dark-900 border-grey-200">
        <label htmlFor={id}>{text}</label>
        <a href={link} className="text-violet-500 font-medium hover:underline ml-2">
          {linkText}
        </a>
      </div>
    </div>
  );
};

interface IInputRadioProps {
  id: string;
  className?: string;
  label: string;
  name: string;
  checked?: boolean;
}

export const InputRadio = ({ id, label, name, checked, className }: IInputRadioProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        type="radio"
        value=""
        name={name}
        checked={checked}
        className="w-4 h-4 text-green-500 accent-grey-500"
      />
      <label htmlFor={id} className="ml-2 text-sm text-grey-400">
        {label}
      </label>
    </div>
  );
};

interface IInputProps {
  id?: string;
  isRequired?: boolean;
  name: string;
  placeholder: string;
  label: string;
  value?: string | number;
  error?: string | boolean;
  type?: string;
  className?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const InputText = ({
  id,
  isRequired,
  name,
  placeholder,
  label,
  error,
  value,
  type,
  onChange,
  handleBlur,
}: IInputProps) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-sm mb-2 font-medium" htmlFor={id}>
        {label}
        {isRequired && <small className="text-red-500 ml-1">*</small>}
      </label>
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        name={name}
        onBlur={handleBlur}
        className={`rounded-md border ${
          error ? "border-error" : "border-grey-100"
        } px-3 py-2 focus:outline-none mb-1 bg-transparent font-light placeholder:text-sm text-sm`}
        onChange={onChange}
        value={value}
      />

      {error && <small className="text-error text-red-500">{error}</small>}
    </div>
  );
};

export const InputPassword = ({ id, isRequired, name, placeholder, label, error, onChange }: IInputProps) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-sm mb-2 font-medium" htmlFor={id}>
        {label}
        {isRequired && <small className="text-red-500 ml-1">*</small>}
      </label>

      <div
        className={`w-full flex items-center rounded-lg border ${
          error ? "border-error" : "border-grey-100"
        } px-3 py-2 focus:outline outline-1 outline-grey-500 mb-1`}
      >
        <input
          id={id}
          type={showPass ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          className="focus:outline-none w-full peer bg-transparent placeholder:text-sm text-sm"
          onChange={onChange}
        />

        <div className="cursor-pointer" onClick={() => setShowPass(!showPass)}>
          {showPass ? <TbEye /> : <TbEyeOff />}
        </div>
      </div>

      {error && <small className="text-error text-red-500">{error}</small>}
    </div>
  );
};

interface ISelectInputProps {
  id: string;
  label?: string;
  isRequired?: boolean;
  options: Array<Record<string | number, string | number>>;
  name?: string;
  value?: string | undefined | number;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  error?: string | undefined | false;
}

export const SelectInput = ({
  id,
  label,
  isRequired,
  options,
  name,
  value,
  onChange,
  className,
  disabled = false,
  defaultValue,
  onBlur,
  error,
}: ISelectInputProps) => {
  return (
    <div className="">
      <label className="text-sm mb-2 font-medium" htmlFor={id}>
        {label}
        {isRequired && <small className="text-red-500 ml-1">*</small>}
      </label>

      <div className="mt-2 flex flex-col w-full relative">
        <select
          id={id}
          name={name}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full rounded-md border-grey-100 border-[1px] h-[40px] pl-4 outline-none bg-transparent text-s text-darkGrey cursor-pointer appearance-none pr-8 focus:border-purple placeholder:text-grey-200 placeholder:text-sm text-sm  ${className}`}
        >
          <option value={""} className="bg-white cursor-pointer placeholder:text-sm text-grey-50">
            Select an option
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-white cursor-pointer placeholder:text-sm text-sm"
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute  inset-y-0 top-0 right-0 flex items-center pr-3">
          <svg className="fill-current h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export const TextArea = ({ id, isRequired, name, placeholder, label, error, onChange, className }: IInputProps) => {
  return (
    <div className={`flex flex-col w-full mb-4`}>
      <label className="text-sm mb-2 font-medium" htmlFor={id}>
        {label}
        {isRequired && <small className="text-red-500 ml-1">*</small>}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        name={name}
        className={`rounded-md border ${
          error ? "border-error" : "border-grey-100"
        } px-3 py-2 focus:outline-none mb-1 bg-transparent font-light resize-none placeholder:text-sm text-sm ${className}`}
        onChange={onChange}
      />

      {error && <small className="text-error text-red-500">{error}</small>}
    </div>
  );
};

interface IInputFileProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile: React.FC<IInputFileProps> = ({ onChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-[95px] border border-grey-100 rounded-lg cursor-pointer bg-transparent"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="mb-2"
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="24"
            viewBox="0 0 26 24"
            fill="none"
          >
            <path
              d="M11.4 12.8H14.6V6.40002H19.4L13 0L6.59997 6.40002H11.4V12.8ZM16.2 9.20003V11.6672L23.5264 14.4L13 18.3249L2.47356 14.4L9.79998 11.6672V9.20003L0.199951 12.8V19.2001L13.0001 24.0001L25.8001 19.2001V12.8L16.2 9.20003Z"
              fill="#78797F"
            />
          </svg>
          <p className="text-xs text-grey-500">Click to upload or drag and drop</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
};

interface ICheckedProps {
  isRequired?: boolean;
  name: string;
  value: string | boolean | readonly string[] | undefined;
  type?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Checkbox = ({ checked, onChange, name, value }: ICheckedProps) => {
  return (
    <div>
      <label className="flex items-start space-x-2">
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          value={value ? value.toString() : undefined}
          className="accent-black h-[15px] w-[15px]"
        />
      </label>
    </div>
  );
};
