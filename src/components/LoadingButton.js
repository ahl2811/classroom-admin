import { Button, Spinner } from "@themesberg/react-bootstrap";
import React from "react";

export const LoadingButton = ({
  variant = "primary",
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button variant={variant} disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Please wait...
        </>
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};
