import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Offer } from "./offersSlice";
import { FIRESTOREURL } from "./constant";

const mapFirestoreData = (data: any): Offer => {
  return {
    id: data.name.split("/").pop() || "",
    aboutCompany: data.fields.aboutCompany.stringValue,
    companyName: data.fields.companyName.stringValue,
    companyWebsite: data.fields.companyWebsite.stringValue,
    contactEmail: data.fields.contactEmail.stringValue,
    createdAt: data.fields.createdAt.timestampValue,
    employmentType: data.fields.employmentType.arrayValue.values.map(
      (v: any) => v.stringValue
    ),
    level: data.fields.level.stringValue,
    location: data.fields.location.stringValue,
    position: data.fields.position.stringValue,
    requirements: data.fields.requirements.stringValue,
    salaryFrom: parseInt(data.fields.salaryFrom.integerValue),
    salaryTo: parseInt(data.fields.salaryTo.integerValue),
    technologies: data.fields.technologies.arrayValue.values.map(
      (v: any) => v.stringValue
    ),
    telegram: data.fields.telegram.stringValue,
    userId: data.fields.userId.stringValue,
  };
};

export const fetchOffers = createAsyncThunk<Offer[]>(
  "offers/fetchOffers",
  async () => {
    const res = await fetch(`${FIRESTOREURL}`);
    const data = await res.json();
    const offer: Offer = mapFirestoreData(data);
    return [offer];
  }
);
