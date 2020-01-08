module.exports = controller => {
  return [
    {
      method: "get",
      path: "/organizations",
      handler: controller.listOrganizations.bind(controller)
    },
    {
      method: "get",
      path: "/organizations/{code}",
      handler: controller.getOrganizationByCode.bind(controller)
    },
    {
      method: "post",
      path: "/organizations",
      handler: controller.addOrganization.bind(controller)
    },
    {
      method: "put",
      path: "/organizations/{code}",
      handler: controller.updateOrganization.bind(controller)
    },
    {
      method: "delete",
      path: "/organizations/{code}",
      handler: controller.deleteOrganization.bind(controller)
    }
  ];
};
