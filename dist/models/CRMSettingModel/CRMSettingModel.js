"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../../utils/miscellaneous/schema"));
// organization model
class CRMSettingModel extends schema_1.default {
    constructor(db) {
        super();
        this.db = db;
    }
    // get all country
    getAllCountry({ organization_id, key, exact_name, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("country");
            // if (limit && skip) {
            //   dtbs.limit(parseInt(limit as string));
            //   dtbs.offset(parseInt(skip as string));
            // }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "name")
                .where("organization_id", organization_id)
                .andWhere(function () {
                if (key) {
                    this.andWhere("name", "ilike", `%${key}%`);
                }
                if (exact_name) {
                    this.andWhere("name", exact_name);
                }
            });
            return {
                data,
            };
        });
    }
    // get all city by country
    getAllCityByCountry(organization_id, { id, limit, skip, name, searchPrm, exact_name, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("city as c");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("c.id", "c.name", "emp.name as created_by_emp_name", "ua.name as created_by_admin_name", "emp2.name as updated_by_emp_name", "ua2.name as updated_by_admin_name")
                .leftJoin("country as co", "c.country_id", "co.id")
                .leftJoin("employee as emp", "c.created_by", "emp.id")
                .leftJoin("user_admin as ua", "c.created_by", "ua.id")
                .leftJoin("employee as emp2", "c.updated_by", "emp2.id")
                .leftJoin("user_admin as ua2", "c.updated_by", "ua2.id")
                .where({ "c.country_id": id })
                .andWhere("c.organization_id", organization_id)
                .andWhere(function () {
                if (name) {
                    this.andWhere("c.name", "ilike", `%${name}%`);
                }
                if (exact_name) {
                    this.andWhere("c.name", exact_name);
                }
                if (searchPrm) {
                    const searchTerm = searchPrm.toLowerCase();
                    this.andWhere((builder) => {
                        builder.whereRaw("LOWER(c.name) LIKE ?", [`%${searchTerm}%`]);
                    });
                }
            })
                .orderBy("c.id", "desc");
            const total = yield this.db("city as c")
                .withSchema(this.CRM_SCHEMA)
                .count("c.id as total")
                .leftJoin("country as co", "c.country_id", "co.id")
                .where({ "c.country_id": id })
                .andWhere("c.organization_id", organization_id)
                .andWhere(function () {
                if (name) {
                    this.andWhere("c.name", "ilike", `%${name}%`);
                }
                if (exact_name) {
                    this.andWhere("c.name", exact_name);
                }
                if (searchPrm) {
                    const searchTerm = searchPrm.toLowerCase();
                    this.andWhere((builder) => {
                        builder.whereRaw("LOWER(c.name) LIKE ?", [`%${searchTerm}%`]);
                    });
                }
            });
            return {
                data,
                total: parseInt(total[0].total),
            };
        });
    }
    // get all area by city
    getAllAreaByCity(organization_id, { id, limit, skip, name, exact_name, searchPrm, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("area as a");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("a.id", "a.name")
                .leftJoin("city", "a.city_id", "city.id")
                .where("a.organization_id", organization_id)
                .andWhere("a.city_id", id)
                .andWhere(function () {
                if (name) {
                    this.andWhere("a.name", "ilike", `%${name}%`);
                }
                if (exact_name) {
                    this.andWhere("a.name", exact_name);
                }
                if (searchPrm) {
                    const searchTerm = searchPrm.toLowerCase();
                    this.andWhere((builder) => {
                        builder.whereRaw("LOWER(a.name) LIKE ?", [`%${searchTerm}%`]);
                    });
                }
            })
                .orderBy("a.id", "desc");
            const result = yield this.db("area as a")
                .withSchema(this.CRM_SCHEMA)
                .count("a.id as total")
                .leftJoin("city", "a.city_id", "city.id")
                .where("a.organization_id", organization_id)
                .andWhere("a.city_id", id)
                .andWhere(function () {
                if (name) {
                    this.andWhere("a.name", "like", `%${name}%`);
                }
                if (searchPrm) {
                    const searchTerm = searchPrm.toLowerCase();
                    this.andWhere((builder) => {
                        builder.whereRaw("LOWER(a.name) LIKE ?", [`%${searchTerm}%`]);
                    });
                }
            });
            return {
                data,
                total: parseInt(result[0].total),
            };
        });
    }
    // insert organization type
    insertOrganizationType(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("org_type")
                .withSchema(this.CRM_SCHEMA)
                .insert(payload);
        });
    }
    // retrieve organization by created_by
    retrieveOrganization(organization_id, { limit, skip, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("org_type");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "name", "created_by", "created_at", "updated_at")
                .orderBy("id", "desc")
                .where({ organization_id })
                .modify(function (queryBuilder) {
                if (name) {
                    queryBuilder.andWhere("name", "ILIKE", `%${name}%`);
                }
            });
            const countQuery = this.db("org_type")
                .withSchema(this.CRM_SCHEMA)
                .where({ organization_id })
                .andWhere(function (queryBuilder) {
                if (name) {
                    queryBuilder.andWhere("name", "ILIKE", `%${name}%`);
                }
            });
            const result = yield countQuery.count("* as total");
            const total = parseInt(result[0].total) || 0;
            return {
                data,
                total,
            };
        });
    }
    // Get all leads organization type
    getAllLeadsByOrganizationType(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, key, from_date, to_date, limit, skip } = payload;
            const endDate = new Date(to_date);
            endDate.setDate(endDate.getDate() + 1);
            const dtbs = this.db("lead_view");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "city_name", "country_name", "source_name", "source_id", "product_name", "area_name", "product_id", "org_type_name", "org_type_id", "contact_person", "contact_lead", "contact_number", "team_id", "team_name", "created_at", "reference", "org_name", "lead_organization_id", "lead_sale")
                .where("org_type_id", id)
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("created_at", [from_date, endDate]);
                }
                if (key) {
                    this.andWhere("org_name", "like", `%${key}%`);
                }
            })
                .orderBy("id", "desc");
            const total = yield this.db("lead_view")
                .count("id as total")
                .withSchema(this.CRM_SCHEMA)
                .where("org_type_id", id)
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("created_at", [from_date, endDate]);
                }
                if (key) {
                    this.andWhere("org_name", "like", `%${key}%`);
                }
            });
            return { data, total: parseInt(total[0].total) };
        });
    }
    // Get all leads organization type
    getAllLeadsByOrganizationName(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, key, from_date, to_date, limit, skip } = payload;
            const endDate = new Date(to_date);
            endDate.setDate(endDate.getDate() + 1);
            const dtbs = this.db("lead_view");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "city_name", "country_name", "source_name", "source_id", "product_name", "area_name", "product_id", "org_type_name", "org_type_id", "contact_person", "contact_lead", "contact_number", "team_id", "team_name", "created_at", "reference", "org_name", "lead_organization_id", "lead_sale")
                .where("lead_organization_id", id)
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("created_at", [from_date, endDate]);
                }
                if (key) {
                    this.andWhere("org_name", "like", `%${key}%`);
                }
            })
                .orderBy("id", "desc");
            const total = yield this.db("lead_view")
                .count("id as total")
                .withSchema(this.CRM_SCHEMA)
                .where("lead_organization_id", id)
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("created_at", [from_date, endDate]);
                }
                if (key) {
                    this.andWhere("org_name", "like", `%${key}%`);
                }
            });
            return { data, total: parseInt(total[0].total) };
        });
    }
    // update organization type
    EditOrganizationType(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("org_type")
                .withSchema(this.CRM_SCHEMA)
                .where({ id: payload.id })
                .update({ name: payload.name }, "name");
        });
    }
    // delete organization type
    deleteOrganizationType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("org_type")
                .withSchema(this.CRM_SCHEMA)
                .where({ id })
                .del();
        });
    }
    // retrieve single organization
    retrieveSingleOrganization(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.db("org_type")
                .withSchema(this.CRM_SCHEMA)
                .select("id", "name", "created_by", "created_at", "updated_at")
                .where({ id })
                .first();
            if (!product) {
                throw new Error("organization type not found");
            }
            return { data: product };
        });
    }
    // create source
    insertIntosource(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("source").withSchema(this.CRM_SCHEMA).insert(payload);
        });
    }
    // retrieve sources from db
    retrieveSources(organization_id, { limit, skip, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("source");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "name", "created_by", "created_at", "updated_at")
                .orderBy("id", "desc")
                .where({ organization_id })
                .andWhere(function (queryBuilder) {
                if (name) {
                    queryBuilder.andWhere("name", "ILIKE", `%${name}%`);
                }
            });
            const total = yield this.db("source")
                .count("id as total")
                .withSchema(this.CRM_SCHEMA)
                .where({ organization_id })
                .andWhere(function (queryBuilder) {
                if (name) {
                    queryBuilder.andWhere("name", "ILIKE", `%${name}%`);
                }
            });
            return {
                data,
                total: parseInt(total[0].total),
            };
        });
    }
    // update source
    updateSources(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("source")
                .withSchema(this.CRM_SCHEMA)
                .where({ id: payload.id })
                .update({ name: payload.name }, "source");
        });
    }
    // get all lead by source
    getAllLeadsBySource(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, key, from_date, to_date, limit, skip } = payload;
            const endDate = new Date(to_date);
            endDate.setDate(endDate.getDate() + 1);
            const dtbs = this.db("lead_view");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "city_name", "country_name", "source_name", "source_id", "product_name", "area_name", "product_id", "org_type_name", "org_type_id", "contact_person", "contact_lead", "contact_number", "team_id", "team_name", "created_at", "reference", "org_name", "lead_organization_id", "lead_sale")
                .where("source_id", id)
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("created_at", [from_date, endDate]);
                }
                if (key) {
                    this.andWhere("org_name", "like", `%${key}%`);
                }
            })
                .orderBy("id", "desc");
            const total = yield this.db("lead_view")
                .count("id as total")
                .withSchema(this.CRM_SCHEMA)
                .where("source_id", id)
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("created_at", [from_date, endDate]);
                }
                if (key) {
                    this.andWhere("org_name", "like", `%${key}%`);
                }
            });
            return { data, total: parseInt(total[0].total) };
        });
    }
    retrieveSingleSource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("source as s")
                .withSchema(this.CRM_SCHEMA)
                .select("s.id", "s.name", this.db.raw(`
            (
                SELECT json_agg(lv)
                FROM (
                    SELECT
                        lv.id as lead_id,
                        lv.source_name,
                        lv.product_name,
                        lv.org_type_name,
                        lv.org_name
                    FROM ${this.CRM_SCHEMA}.lead_view as lv
                    WHERE lv.source_id = s.id
                    ORDER BY lv.id DESC
                ) as lv
            ) as lead_views
        `))
                .where("s.id", id);
        });
    }
    // delete source
    deleteSource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("source")
                .withSchema(this.CRM_SCHEMA)
                .where({ id })
                .del();
        });
    }
    // ===================== support type ==================//
    // insert support type
    insertSupportType(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("support_type")
                .withSchema(this.CRM_SCHEMA)
                .insert(payload);
        });
    }
    // get all support type
    getAllSupportType(organization_id, { limit, skip, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("support_type");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "name", "created_at", "updated_at")
                .orderBy("id", "desc")
                .where({ organization_id })
                .andWhere(function (queryBuilder) {
                if (name) {
                    queryBuilder.andWhere("name", "LIKE", `%${name}%`);
                }
            });
            const total = yield this.db("support_type")
                .count("id as total")
                .withSchema(this.CRM_SCHEMA)
                .where({ organization_id })
                .andWhere(function (queryBuilder) {
                if (name) {
                    queryBuilder.andWhere("name", "LIKE", `%${name}%`);
                }
            });
            return {
                data,
                total: parseInt(total[0].total),
            };
        });
    }
    // update support type
    updateSupportType({ name, id, organization_id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("support_type")
                .withSchema(this.CRM_SCHEMA)
                .where({ id })
                .andWhere({ organization_id })
                .update({ name });
        });
    }
    //========================= End ===========================//
    // insert into product
    insertProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("product").withSchema(this.CRM_SCHEMA).insert(payload);
        });
    }
    // retrieve product
    retrieveProduct(organization_id, { limit, skip, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("product");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "name", "created_by", "created_at", "updated_at")
                .orderBy("id", "desc")
                .where({ organization_id })
                .andWhere(function (queryBuilder) {
                if (name) {
                    queryBuilder.andWhere("name", "ILIKE", `%${name}%`);
                }
            });
            const total = yield this.db("product")
                .count("id as total")
                .withSchema(this.CRM_SCHEMA)
                .where({ organization_id })
                .andWhere(function (queryBuilder) {
                if (name) {
                    queryBuilder.andWhere("name", "ILIKE", `%${name}%`);
                }
            });
            return {
                data,
                total: parseInt(total[0].total),
            };
        });
    }
    // get all lead by product
    getAllLeadByProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, key, from_date, to_date, limit, skip } = payload;
            const endDate = new Date(to_date);
            endDate.setDate(endDate.getDate() + 1);
            const dtbs = this.db("lead_view");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("id", "city_name", "country_name", "source_name", "source_id", "product_name", "area_name", "product_id", "org_type_name", "org_type_id", "contact_person", "contact_lead", "contact_number", "team_id", "team_name", "created_at", "reference", "org_name", "lead_organization_id", "lead_sale")
                .where("product_id", id)
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("created_at", [from_date, endDate]);
                }
                if (key) {
                    this.andWhere("org_name", "ilike", `%${key}%`);
                }
            })
                .orderBy("id", "desc");
            const total = yield this.db("lead_view")
                .count("id as total")
                .withSchema(this.CRM_SCHEMA)
                .where("product_id", id)
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("created_at", [from_date, endDate]);
                }
                if (key) {
                    this.andWhere("org_name", "ilike", `%${key}%`);
                }
            });
            return { data, total: parseInt(total[0].total) };
        });
    }
    // update product
    updateProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("product")
                .withSchema(this.CRM_SCHEMA)
                .where({ id: payload.id })
                .update({ name: payload.name }, "name");
        });
    }
    // delete product
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("product")
                .withSchema(this.CRM_SCHEMA)
                .where({ id })
                .del();
        });
    }
    // retrieve single product
    retrieveSingleProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.db("product")
                .withSchema(this.CRM_SCHEMA)
                .select("id", "name", "created_by", "created_at", "updated_at")
                .where({ id })
                .first();
            if (!product) {
                throw new Error("Product not found");
            }
            return { data: product };
        });
    }
    // assign monthly target
    assignMonthlyTarget(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("assign_monthly_target")
                .withSchema(this.CRM_SCHEMA)
                .insert(payload);
        });
    }
    // get all monthly targets
    retrieveMonthlyTarget(organization_id, { emp_id, limit, skip, from_date, to_date, searchPrm }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("crm.assign_monthly_target as a");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .select("a.id", "a.month", "a.visit", "a.sale", "a.phone_call", "a.employee_id", "a.sale_in_amount", this.db.raw("crm.employee.name as employee_name"), "a.created_by", "a.created_at", "a.updated_at")
                .leftJoin("crm.employee", "a.employee_id", "employee.id")
                .orderBy("a.id", "desc")
                .where({ "a.organization_id": organization_id })
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("a.month", [from_date, to_date]);
                }
                if (emp_id) {
                    this.andWhere("a.employee_id", emp_id);
                }
                // serach by employee name
                if (searchPrm) {
                    const searchTerm = searchPrm.toLowerCase();
                    this.andWhere((builder) => {
                        builder.whereRaw("LOWER(crm.employee.name) LIKE ?", [
                            `%${searchTerm}%`,
                        ]);
                    });
                }
            });
            const Tdtbs = this.db("crm.assign_monthly_target as a")
                .leftJoin("crm.employee", "a.employee_id", "employee.id")
                .where({ "a.organization_id": organization_id })
                .andWhere(function () {
                if (from_date && to_date) {
                    this.andWhereBetween("a.month", [from_date, to_date]);
                }
                if (emp_id) {
                    this.andWhere("a.employee_id", emp_id);
                }
                // serach by employee name
                if (searchPrm) {
                    const searchTerm = searchPrm.toLowerCase();
                    this.andWhere((builder) => {
                        builder.whereRaw("LOWER(crm.employee.name) LIKE ?", [
                            `%${searchTerm}%`,
                        ]);
                    });
                }
            });
            const result = yield Tdtbs.count("* as total");
            const total = parseInt(result[0].total) || 0;
            return {
                data,
                total,
            };
        });
    }
    // update montly target
    updateMonthlyTarget(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = payload, targetDataWithoutId = __rest(payload, ["id"]);
            return yield this.db("assign_monthly_target")
                .withSchema(this.CRM_SCHEMA)
                .where({ id })
                .update(targetDataWithoutId);
        });
    }
    // delete monthly target
    deleteMonthlyTarget(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("assign_monthly_target")
                .withSchema(this.CRM_SCHEMA)
                .where({ id })
                .del();
        });
    }
    // retrieve single target
    retrieveSingleMonthlyTarget(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = yield this.db("crm.assign_monthly_target")
                .select("assign_monthly_target.id", "assign_monthly_target.month", "assign_monthly_target.sale", "assign_monthly_target.visit", "assign_monthly_target.phone_call", "assign_monthly_target.employee_id", this.db.raw("evo.employee.name as employee_name"), "assign_monthly_target.created_by", "assign_monthly_target.created_at", "assign_monthly_target.updated_at")
                .leftJoin("evo.employee", "assign_monthly_target.employee_id", "employee.id")
                .where({ "assign_monthly_target.id": id })
                .first();
            if (!target) {
                throw new Error("Monthly target not found");
            }
            return { data: target };
        });
    }
    // add country
    addCountry(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("country").withSchema(this.CRM_SCHEMA).insert(payload);
        });
    }
    // update country
    updateCountry(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("country")
                .withSchema(this.CRM_SCHEMA)
                .update(payload)
                .where({ id });
        });
    }
    // get all country
    // public async retrieveCountry({ id, limit, skip, name }: ICRMCountryFilter) {
    //   const dtbs = this.db("country");
    //   if (limit && skip) {
    //     dtbs.limit(parseInt(limit as string));
    //     dtbs.offset(parseInt(skip as string));
    //   }
    //   const data = await dtbs
    //     .withSchema(this.CRM_SCHEMA)
    //     .where({ created_by: id })
    //     .groupBy("id", "name", "created_at", "updated_at", "created_by")
    //     .select("id", "name", "created_at", "updated_at", "created_by");
    //   const totalCount = await dtbs
    //     .where({ created_by: id })
    //     .andWhere(function () {
    //       if (name) {
    //         this.andWhere({ name });
    //       }
    //     })
    //     .groupBy("id")
    //     .countDistinct("id as total");
    //   const total = parseInt(totalCount[0].total as string);
    //   return {
    //     data,
    //     total,
    //   };
    // }
    retrieveCountry(organization_id, { limit, skip, name, searchPrm, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("country as c");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .select("c.id", "c.name", "c.created_at", "emp.name as created_by_emp_name", "ua.name as created_by_admin_name", "emp2.name as updated_by_emp_name", "ua2.name as updated_by_admin_name")
                .leftJoin("employee as emp", "c.created_by", "emp.id")
                .leftJoin("user_admin as ua", "c.created_by", "ua.id")
                .leftJoin("employee as emp2", "c.updated_by", "emp2.id")
                .leftJoin("user_admin as ua2", "c.updated_by", "ua2.id")
                .orderBy("c.id", "desc")
                .where("c.organization_id", organization_id)
                .andWhere(function () {
                if (name) {
                    this.andWhere("c.name", name);
                }
                if (searchPrm) {
                    const searchTerm = searchPrm.toLowerCase();
                    this.andWhere((builder) => {
                        builder.whereRaw("LOWER(c.name) LIKE ?", [`%${searchTerm}%`]);
                    });
                }
            });
            const total = yield this.db("country as c")
                .count("c.id as total")
                .withSchema(this.CRM_SCHEMA)
                .leftJoin("employee as emp", "c.created_by", "emp.id")
                .leftJoin("user_admin as ua", "c.created_by", "ua.id")
                .leftJoin("employee as emp2", "c.updated_by", "emp2.id")
                .leftJoin("user_admin as ua2", "c.updated_by", "ua2.id")
                .where("c.organization_id", organization_id)
                .andWhere(function () {
                if (name) {
                    this.andWhere("c.name", name);
                }
                if (searchPrm) {
                    const searchTerm = searchPrm.toLowerCase();
                    this.andWhere((builder) => {
                        builder.whereRaw("LOWER(c.name) LIKE ?", [`%${searchTerm}%`]);
                    });
                }
            });
            return {
                data,
                total: parseInt(total[0].total),
            };
        });
    }
    deleteCountry(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("country")
                .withSchema(this.CRM_SCHEMA)
                .where({ id })
                .del();
        });
    }
    addCity(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("city").withSchema(this.CRM_SCHEMA).insert(payload);
        });
    }
    // update city
    updateCity(payload, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("city")
                .withSchema(this.CRM_SCHEMA)
                .where({ id })
                .update(payload);
        });
    }
    // add area
    addArea(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("area").withSchema(this.CRM_SCHEMA).insert(payload);
        });
    }
    // update area
    updateArea({ organization_id, name, updated_by, id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db("area")
                .withSchema(this.CRM_SCHEMA)
                .update({ name, updated_by })
                .where({ organization_id })
                .andWhere({ id });
        });
    }
    // single area
    getSingleArea(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const area = yield this.db("area")
                .withSchema(this.CRM_SCHEMA)
                .select("*")
                .where({ id })
                .first();
            if (!area) {
                throw new Error("area not found");
            }
            return { data: area };
        });
    }
    // get all address fron vertual table(view) address view
    getAllAddress(organization_id, { limit, skip, area, country, city }) {
        return __awaiter(this, void 0, void 0, function* () {
            const dtbs = this.db("address_view");
            if (limit && skip) {
                dtbs.limit(parseInt(limit));
                dtbs.offset(parseInt(skip));
            }
            const data = yield dtbs
                .withSchema(this.CRM_SCHEMA)
                .where({ organization_id })
                .andWhere((builder) => {
                if (area) {
                    builder.where("area_name", area);
                }
                if (country) {
                    builder.where("country_name", country);
                }
                if (city) {
                    builder.where("city_name", city);
                }
            })
                .groupBy("area_id", "area_name", "city_id", "city_name", "country_id", "country_name", "address_view.organization_id")
                .select("*");
            const Tdtbs = this.db("crm.address_view").where({ organization_id });
            const result = yield Tdtbs.count("* as total");
            const total = parseInt(result[0].total) || 0;
            return {
                data,
                total,
            };
        });
    }
}
exports.default = CRMSettingModel;
