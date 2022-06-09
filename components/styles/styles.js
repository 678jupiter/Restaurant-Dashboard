import styled from "styled-components/native";


export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;



export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  ${(props) => (props.type === "SUCCESS" ? green : red)}
`;

