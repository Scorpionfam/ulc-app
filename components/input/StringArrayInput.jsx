"use client";
import React, { useContext, useEffect, useState } from "react";
import { ConfigsContext } from "@/context/configs.context";
import { Plus, X } from 'lucide-react';
import Label from "./Label"

const StringInput = (props) => {
  const { valueIndex, value, values, setNewValues, removeValue } = props;
  const [error, setError] = useState(null);

  const updateValue = (newValue) => {
    const newValues = [...values];
    newValues[valueIndex] = newValue;
    setNewValues(newValues);
  };

  return (
    <div className='flex gap-2 items-center w-full'>
      <form
        className='w-full'
        onChange={(e) => {
          e.preventDefault();

          if (e.target.value.length < 1) {
            setError("Required");
            return;
          } else if (e.target.value.includes(" ")) {
            setError("No spaces");
            return;
          }

          setError(null);
          updateValue(e.target.value);
        }}
      >
        <input
          type='text'
          placeholder='Model Name'
          className={`bg-zinc-900/40 rounded-md px-2 py-1 w-full border border-zinc-600 text-zinc-300 placeholder:text-zinc-500`}
          onChange={(e) => {
            e.preventDefault();
          }}
          value={value}
        />
        {error ? <p>{error}</p> : null}
      </form>
      <button
        className='flex items-center justify-center h-7 aspect-square bg-zinc-700 rounded hover:brightness-125 transition border-t border-zinc-600'
        onClick={() => {
          removeValue(valueIndex);
        }}
      >
        <X size={16}/>
      </button>
    </div>
  );
};

const StringArrayInput = (props) => {
  const { configId, field, label, tooltipText, values } = props;
  const { updateConfigValue } = useContext(ConfigsContext);

  const [newValues, setNewValues] = useState(values);

  useEffect(() => {
    updateConfigValue(configId, field, newValues);
  }, [newValues]);

  const addValue = () => {
    const newValues = [...values];
    newValues.push("");
    setNewValues(newValues);
  };

  const removeValue = (index) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    setNewValues(newValues);
  };

  const inputs = newValues.map((value, index) => {
    return (
      <StringInput
        key={index}
        valueIndex={index}
        value={value}
        values={newValues}
        setNewValues={setNewValues}
        removeValue={removeValue}
      />
    );
  });

  return (
    <div className="w-full">
      <div className="flex justify-between w-full items-center">
        <Label text={label} tooltipText={tooltipText}/>
        <button
          className='flex items-center justify-center h-7 aspect-square bg-zinc-700 rounded hover:brightness-125 transition border-t border-zinc-600'
          onClick={() => {
            addValue();
          }}
        >
          <Plus size={18}/>
        </button>
      </div>
      
      <div className='flex flex-col gap-2 mt-2'>{inputs}</div>
    </div>
  );
};

export default StringArrayInput;