import { React, useState } from "react";
import { Flex, Text, SlideFade, Box } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { BiCart } from "react-icons/bi";

const CartWidget = ({ totalCount }) => {
  let val = totalCount;
  return (
    <Box>
      {val !== 0 ? (
        <SlideFade in={val !== 0 ? true : false}>
          <Flex alignItems={"center"}>
            <RouteLink to="/cart">
              <BiCart size="32px" />
            </RouteLink>
            <Text> {totalCount}</Text>
          </Flex>
        </SlideFade>
      ) : (
        ""
      )}
    </Box>
  );
};

export default CartWidget;
