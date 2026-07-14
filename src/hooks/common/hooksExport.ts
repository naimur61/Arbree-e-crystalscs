import AllSecurityQuestion from "./all-fetch-hook/getSecurityQuestion";
import AllBankAccountList from "./all-fetch-hook/useBankAccountList";
import AllEnrolledCourse from "./all-fetch-hook/useEnrollStudentCourseList";
import useGetDocumentUrl from "./all-fetch-hook/useGetDocumentUrl";

const HookDataFetcher = {
  AllEnrolledCourse,
  AllBankAccountList,
  AllSecurityQuestion,
  useGetDocumentUrl,
  // useFetchData,
};

export default HookDataFetcher;
