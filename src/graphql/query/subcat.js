import gql from "graphql-tag";

export const findSubcatQuery = gql`
  query findSubcat($name:String, $company_id:String, $skip:Int, $take:Int){
    findSubcat(name:$name, company_id:$company_id, skip:$skip, take:$take) {
        total
        skip
        take
        data{
            id
            name
            company_id
            author{
                id
                name
                lastname
                picture
            }
            subprod_count
            created_at
            updated_at
          }
      
    }
  }
`;
