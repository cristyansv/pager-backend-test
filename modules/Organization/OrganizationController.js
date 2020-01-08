class OrganizationController {
  constructor(service) {
    this.service = service;
  }

  async listOrganizations(request, h) {
    try {
      const { code, name } = request.query;

      return await this.service.list({ code, name });
    } catch (e) {
      console.error(e);
      return e.toString();
    }
  }

  async getOrganizationByCode(request, h) {
    try {
      const { code } = request.params;

      return this.service.getByCode(code);
    } catch (e) {
      console.error(e);
      return e.toString();
    }
  }

  async addOrganization(request, h) {
    try {
      return this.service.add(request.payload);
    } catch (e) {
      console.error(e);
      return e.toString();
    }
  }

  async updateOrganization(request, h) {
    try {
      const { code } = request.params;
      const { organization } = request.payload;

      return await this.service.updateByCode(code, organization);
    } catch (e) {
      console.error(e);
      return e.toString();
    }
  }

  async deleteOrganization(request, h) {
    try {
      const { code } = request.params;
      return await this.service.deleteByCode(code);
    } catch (e) {
      console.error(e);
      return e.toString();
    }
  }
}

module.exports = OrganizationController;
