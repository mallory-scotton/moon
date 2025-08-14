/**
 * @brief Certification information
 * @description Contains the certification details
 */
export interface TMDBCertification {
  certification: string;
  meaning: string;
  order: number;
}

/**
 * @brief Certifications information
 * @description Contains the certification details for multiple countries
 */
export interface TMDBCertifications {
  certifications: {
    'AR': TMDBCertification[];
    'AT': TMDBCertification[];
    'AU': TMDBCertification[];
    'BG': TMDBCertification[];
    'BR': TMDBCertification[];
    'CA': TMDBCertification[];
    'CA-QC': TMDBCertification[];
    'CH': TMDBCertification[];
    'CL': TMDBCertification[];
    'CZ': TMDBCertification[];
    'DE': TMDBCertification[];
    'DK': TMDBCertification[];
    'ES': TMDBCertification[];
    'FI': TMDBCertification[];
    'FR': TMDBCertification[];
    'GB': TMDBCertification[];
    'GR': TMDBCertification[];
    'HK': TMDBCertification[];
    'HU': TMDBCertification[];
    'ID': TMDBCertification[];
    'IE': TMDBCertification[];
    'IL': TMDBCertification[];
    'IN': TMDBCertification[];
    'IT': TMDBCertification[];
    'JP': TMDBCertification[];
    'KR': TMDBCertification[];
    'LT': TMDBCertification[];
    'LU': TMDBCertification[];
    'LV': TMDBCertification[];
    'MO': TMDBCertification[];
    'MX': TMDBCertification[];
    'MY': TMDBCertification[];
    'NL': TMDBCertification[];
    'NO': TMDBCertification[];
    'NZ': TMDBCertification[];
    'PH': TMDBCertification[];
    'PL': TMDBCertification[];
    'PR': TMDBCertification[];
    'PT': TMDBCertification[];
    'RO': TMDBCertification[];
    'RU': TMDBCertification[];
    'SE': TMDBCertification[];
    'SG': TMDBCertification[];
    'SK': TMDBCertification[];
    'TH': TMDBCertification[];
    'TR': TMDBCertification[];
    'TW': TMDBCertification[];
    'UA': TMDBCertification[];
    'US': TMDBCertification[];
    'VI': TMDBCertification[];
    'ZA': TMDBCertification[];
  };
}
