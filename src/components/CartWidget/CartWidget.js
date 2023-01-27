import { React, useState } from "react";
import { Flex, Text, SlideFade } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { BiCart } from "react-icons/bi";

const CartWidget = ({ totalCount }) => {
  let val = totalCount;
  return (
    <SlideFade in={val !== 0 ? true : false}>
      <Flex alignItems={"center"}>
        <RouteLink to="/cart">
          <BiCart size="32px" />
        </RouteLink>
        <Text> {totalCount}</Text>
      </Flex>
    </SlideFade>
  );
};

export default CartWidget;
