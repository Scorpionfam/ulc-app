import React, { useContext } from "react";
import * as Switch from "@radix-ui/react-switch";
import { ConfigsContext } from "@/context/configs.context";
import Label from "./Label";

const ToggleSwitch = (props) => {
  const {
    controlled,
    configIndex,
    label,
    tooltipText,
    field,
    value,
    setValue,
  } = props;
  const { updateConfigValue } = useContext(ConfigsContext);

  const handleChange = (e) => {
    if (controlled) {
      setValue(e);
    } else {
      updateConfigValue(configIndex, field, e);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <Label text={label} tooltipText={tooltipText} />
      <Switch.Root
        className='w-10 h-5 bg-zinc-700 rounded-full relative data-[state=checked]:bg-emerald-500 outline-none cursor-default'
        value={value}
        onCheckedChange={handleChange}
      >
        <Switch.Thumb className='block w-[12px] h-[12px] bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-6' />
      </Switch.Root>
    </div>
  );
};

export default ToggleSwitch;
