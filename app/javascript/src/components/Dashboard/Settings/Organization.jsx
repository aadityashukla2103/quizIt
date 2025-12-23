import React, { useEffect, useMemo, useState } from "react";

import organizationApi from "apis/organization";
import usersApi from "apis/users";
import { Form, Formik } from "formik";
import { Button, Typography } from "neetoui";
import { Input } from "neetoui/formik";

import { ORGANIZATION_FORM_VALIDATION_SCHEMA } from "./constants";
import SettingsHeader from "./SettingsHeader";

const Organization = () => {
  const [organization, setOrganization] = useState({ name: "" });
  const [loading, setLoading] = useState(true);

  const fetchOrganization = async () => {
    try {
      const response = await usersApi.fetchCurrentUser();
      setOrganization(response.organization || { name: "" });
    } catch (err) {
      logger.error("Failed to fetch user", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  const initialFormValues = useMemo(
    () => ({
      name: organization?.name || "",
    }),
    [organization]
  );

  const handleSubmit = async (data, { setSubmitting, resetForm }) => {
    if (!organization?.id) return;

    try {
      const updatedOrg = await organizationApi.update(organization.id, {
        name: data.name,
      });
      setOrganization(updatedOrg.organization);
      resetForm({ values: { name: updatedOrg.organization.name } });
    } catch (err) {
      logger.error("Failed to update organization", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <SettingsHeader />
      <div className="m-8 overflow-hidden">
        <div className="mb-6">
          <Typography style="h1">General Settings</Typography>
          <Typography className="text-gray-500" style="h4">
            Customize the quiz site name
          </Typography>
        </div>
        <div className="mt-6 max-w-xl">
          <Formik
            enableReinitialize
            initialValues={initialFormValues}
            validationSchema={ORGANIZATION_FORM_VALIDATION_SCHEMA}
            onSubmit={handleSubmit}
          >
            {({ dirty, isSubmitting, resetForm }) => (
              <Form className="space-y-6">
                <Input
                  required
                  label="Quiz Title"
                  name="name"
                  placeholder="Enter organization name"
                  size="large"
                  type="text"
                />
                <div className="flex items-center gap-4">
                  <Button
                    disabled={!dirty || isSubmitting}
                    label="Save Changes"
                    loading={isSubmitting}
                    type="submit"
                  />
                  <Button
                    disabled={!dirty}
                    label="Cancel"
                    style="text"
                    onClick={() => resetForm({ values: initialFormValues })}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Organization;
