declare global {
  interface Business {
    id: number
    logo: string
    logoUrl: string
    businessName: string
    businessCategoryName: string
    businessCategoryId: string
    businessCore: string
  }
  interface BusinessCategory {
    paramCode: string
    paramName: string
    selected: boolean
  }
  type GetBusinessParentResponse = {
    success: string
    data: {
      content: Business[]
      last: boolean
      totalPages: number
    }
    message: string
  }
  type GetBusinessCategoryResponse = {
    success: string
    data: BusinessCategory[]
    message: string
  }
}

export {}
