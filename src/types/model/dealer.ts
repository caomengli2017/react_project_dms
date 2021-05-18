export interface DealerApplicationListModal {
  id: number;
  agentName: string;
  parentAgentName: string;
  createdAt: string;
  status: number;
}
export interface SubAgent {
  id: number;
  name: string;
}

export interface Store {
  storeName: string;
  tel: string;
  name: string;
  updatedAt: string;
  address: string;
  status: number;
  storeId: number;
}

export interface IDealerDetailsModal {
  status: number;
  managerId: number;
  joinTime: string;
  agentLevel: string;
  name: string;
  parentAgentName: string;
  managerName: string;
  tel: string;
  idCard: string;
  socialCreditCode: string;
  businessLicense: string;
  idCardFront: string;
  idCardBack: string;
  address: string;
  subAgent: SubAgent[];
  stores: Store[];
}
