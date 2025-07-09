import { Controller } from "react-hook-form";
import { StyleSheet, TextInput as RNTextInput, View } from "react-native";
import { Typography } from "@/components/Typography/Typography";
import { Colors } from "@/theme/colors";
import { ErrorMessage } from "@/components/ErrorMessage";

const NumberInput = ({
  control,
  placeholder,
  required,
  label,
  name,
}: {
  control: any;
  placeholder: string;
  required?: boolean;
  label: string;
  name: string;
}) => {
  return (
    <Controller
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <Typography>
            {label}
            {required && <Typography color="textError">*</Typography>}
          </Typography>
          <RNTextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[
              styles.textInput,
              {
                borderColor: error
                  ? `${Colors.textError}`
                  : `${Colors.textLight}`,
              },
            ]}
            autoComplete="off"
            autoCapitalize="none"
            keyboardType="numeric"
            inputMode="numeric"
            maxLength={10}
          />
          {error && (
            <ErrorMessage message={error.message || "An error occurred!"} />
          )}
        </View>
      )}
      name={name}
      rules={{ required: required && "This field is required!" }}
    />
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
  },
  textInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
});
