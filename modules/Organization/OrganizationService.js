/**
 * Organization
 * @typedef {Object} Organization
 * @property {Object} organization - organization object
 * @property {string} organization.code - organization unique key
 * @property {string} organization.name - organization name
 * @property {string} organization.description - organization description
 * @property {string} organization.url - organization url
 * @property {('employer'|'insurance' | 'health system')} organization.type - organization type
 */

/**
 * @class OrganizationService
 */
class OrganizationService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * list all organizations
   * @returns {Promise<Organization[]>}
   */
  async list({ code = null, name = null }) {
    const defaultSelect = ["name", "description", "type"];

    try {
      if (code || name) {
        let select = defaultSelect;

        const query = {};

        if (code) {
          select = ["*"];
          query.code = code;
        }

        if (name) {
          query.name = name;
        }

        return await this.repository.filterByColumn(query, "OR", select);
      }
      return this.repository.list(defaultSelect);
    } catch (e) {
      throw e;
    }
  }

  /**
   * add a new organization
   * @param {Organization} organization
   * @returns {Promise<Organization>}
   */
  async add(organization) {
    try {
      if (!organization || !organization.code) {
        throw new Error("organization code is required");
      } else {
        const checkOrganization = await this.getByCode(organization.code);

        if (checkOrganization) {
          throw new Error("an organization with the same code already exists");
        }
        await this.repository.add(organization);
        return this.getByCode(organization.code);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * get organization by code
   * @param code
   * @returns {Promise<(Organization | null)>}
   */
  async getByCode(code) {
    try {
      if (!code) {
        throw new Error("code is required");
      }
      const results = await this.repository.filterByColumn({ code: code });

      if (results.length === 0) {
        return null;
      }

      return results[0];
    } catch (e) {
      throw e;
    }
  }

  /**
   * update organization by organization code
   * check if organization exist, also check if new code is already in use
   * @param  {string} code
   * @param {Organization} organization
   * @returns {Promise<Organization>}
   */
  async updateByCode(code, organization) {
    try {
      if (!code) {
        throw new Error("code is required");
      }

      const oldOrganization = await this.getByCode(code);

      if (!oldOrganization) {
        throw new Error("organization not found");
      }

      if (organization.code && code !== organization.code) {
        const replaceOrganization = await this.getByCode(organization.code);

        if (replaceOrganization) {
          throw new Error("new code is already in use");
        }
      }

      const newOrganization = { ...oldOrganization, ...organization };
      await this.repository.updateByCode(code, newOrganization);

      return this.getByCode(newOrganization.code);
    } catch (e) {
      throw e;
    }
  }

  /**
   * delete a organization by code
   * @param {string} code
   * @returns {Promise<>}
   */
  async deleteByCode(code) {
    try {
      if (!code) {
        throw new Error("code is required");
      }

      const oldOrganization = await this.getByCode(code);

      if (!oldOrganization) {
        throw new Error("organization not found");
      }

      await this.repository.deleteByCode(code);

      return "organization deleted";
    } catch (e) {
      throw e;
    }
  }
}
module.exports = OrganizationService;
