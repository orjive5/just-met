import { Controller } from "react-hook-form";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Typography } from "@/components/Typography/Typography";
import { Colors } from "@/theme/colors";
import { ErrorMessage } from "@/components/ErrorMessage";

const RadioButtonInput = ({
  control,
  placeholder,
  required,
  label,
  name,
  options,
}: {
  control: any;
  placeholder: string;
  required?: boolean;
  label: string;
  name: string;
  options: { label: string; value: string | Record<string, string> }[];
}) => {
  const Option = ({
    label,
    value,
    onChange,
    isSelected,
  }: {
    label: string;
    value: string | Record<string, string>;
    onChange: (value: string | Record<string, string>) => void;
    isSelected: boolean;
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.option,
          isSelected && {
            backgroundColor: `${Colors.brandPrimary}`,
            borderColor: `${Colors.brandPrimary}`,
          },
        ]}
        onPress={() => onChange(value)}
      >
        <Typography
          variant="s"
          color={isSelected ? "textSecondary" : "textPrimary"}
        >
          {label}
        </Typography>
      </TouchableOpacity>
    );
  };

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Typography>
            {label}

            {required && <Typography color="textError">*</Typography>}
          </Typography>
          {placeholder && (
            <Typography variant="s" color="textLight">
              {placeholder}
            </Typography>
          )}
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <Option
                key={option.label}
                label={option.label}
                value={option.value}
                onChange={onChange}
                isSelected={
                  value === option.value ||
                  JSON.stringify(value) === JSON.stringify(option.value)
                }
              />
            ))}
          </View>
          {error && (
            <ErrorMessage message={error.message || "An error occurred!"} />
          )}
        </View>
      )}
      name={name}
      rules={{
        required: required && "This field is required!",
      }}
    />
  );
};

export default RadioButtonInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  option: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: `${Colors.textLight}`,
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 20,
  },
});
