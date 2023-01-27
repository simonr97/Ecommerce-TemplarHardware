import {
  HStack,
  StackProps,
  Text,
  TextProps,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export function formatPrice(
  value: number,
  opts: { locale?: string, currency?: string } = {}
) {
  const { locale = "en-US", currency = "USD" } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export const PriceTag = (props) => {
  const { price, currency } = props;
  return (
    <HStack spacing="1">
      <Price>{formatPrice(price, currency)}</Price>
    </HStack>
  );
};

const Price = (props) => {
  const { children, textProps } = props;
  const color = mode("gray.700", "gray.400");
  return (
    <Text as="span" fontWeight="medium" color={color} {...textProps}>
      {children}
    </Text>
  );
};
