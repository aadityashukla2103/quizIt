import React, { useMemo } from "react";

import organizationApi from "apis/organization";
import { useUserState, useUserDispatch } from "contexts/user";
import { Form, Formik } from "formik";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import { Container, Header } from "neetoui/layouts";

import { ORGANIZATION_FORM_VALIDATION_SCHEMA } from "./constants";

const Organization = () => {
  const { user } = useUserState();
  const dispatch = useUserDispatch();

  const initialFormValues = useMemo(
    () => ({
      name: user.organization?.name || "",
    }),
    [user]
  );

  const handleSubmit = async (data, { setSubmitting, resetForm }) => {
    try {
      const updatedOrg = await organizationApi.update(user.organization.id, {
        name: data.name,
      });

      dispatch({
        type: "SET_USER",
        payload: { ...user, organization: updatedOrg },
      });

      resetForm({ values: data });
    } catch (err) {
      logger.error(err);
      alert("Failed to update organization");
    } finally {
      setSubmitting(false);
    }
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header
        className="neeto-ui-border-gray-200 border-b"
        title="Update Organization"
      />
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
        <Formik
          initialValues={initialFormValues}
          validationSchema={ORGANIZATION_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ dirty, isSubmitting }) => (
            <Form className="neeto-ui-rounded-lg neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8">
              <Input
                required
                label="Organization Name"
                name="name"
                placeholder="Enter organization name"
                type="text"
              />
              <Button
                fullWidth
                className="h-8"
                disabled={!dirty || isSubmitting}
                label="Update"
                loading={isSubmitting}
                size="small"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Organization;
