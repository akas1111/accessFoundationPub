import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { MyFormLabel } from "./Common";
import { Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { USER } from "@/utils/endpoints";
import { getUserData } from "@/utils/UserContext";

interface MyAddressProps {
  label: string;
  control: any;
  error?: any;
  defaultValue?: string;
  validation?: any;
  name: string;
  required?: boolean;
  setPostalCode?: (pc: string) => void;
}
export default function MyAddressInput({
  label,
  control,
  error,
  defaultValue,
  validation,
  name,
  required = false,
  setPostalCode,
}: MyAddressProps) {
  const [addressText, setAddressText] = useState<string>("");
  const [addressOptions, setAddressOptions] = useState<any[]>([]);
  const { at }: any = getUserData();
  const onChangeAddress = (value: string) => {
    if (value) {
      setAddressText(value ?? "");
    }
  };
  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        if (addressText.length > 0) {
          const resp = await axios.get(USER.addressAPI, {
            params: { search: addressText },
            headers: { Authorization: `Bearer ${at}` },
          });
          const data = resp?.data?.data ?? [];
          if (Array.isArray(data) && data?.length > 0) {
            const options = data
              ?.filter((item) => /^\d/.test(item?.address))
              .map((itm: any) => ({
                label: itm?.address,
                value: itm?.address,
                pid: itm?.placeId,
              }));
            setAddressOptions(options);
          } else {
            setAddressOptions([]);
          }
        } else {
          setAddressOptions([]);
        }
      } catch (e) {
        console.log(e);
      }
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [addressText]);

  const getPostalCode = (placeId: string | null) => {
    if (placeId) {
      axios
        .get(USER.postalCodeAPI, {
          params: { place: placeId },
          headers: { Authorization: `Bearer ${at}` },
        })
        .then((resp) => {
          const postalCode = resp?.data?.data?.postalCode ?? null;
          if (postalCode && setPostalCode) {
            setPostalCode(postalCode);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="mb-3">
      <MyFormLabel required={required}>{label ?? ""}</MyFormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#86b7fe" : "#ced4da",
                height: 46,
                boxShadow: "none",
                ...(error ? { border: "1px solid #dc3545" } : {}),
              }),
            }}
            ref={ref}
            value={addressOptions.filter((c) => value?.includes(c.value))}
            defaultInputValue={defaultValue?.split(",")?.[0] ?? defaultValue}
            getOptionLabel={(e) => e.value}
            formatOptionLabel={(option, { context }) =>
              context === "menu"
                ? option.value
                : option?.value?.split(",")?.[0] ?? option.value
            }
            onChange={(selectedOptions) => {
              const optionsArray: any = Array.isArray(selectedOptions)
                ? selectedOptions
                : [selectedOptions];
              getPostalCode(optionsArray?.[0].pid ?? null);
              return onChange(optionsArray.map((c: any) => c.value));
            }}
            options={addressOptions}
            onInputChange={onChangeAddress}
          />
        )}
        rules={validation}
      />
      <div>
        {error && (
          <Typography variant="body2" color="error.dark" sx={{ pt: 0.5 }}>
            {(error.message as string) ?? ""}
          </Typography>
        )}
      </div>
    </div>
  );
}
