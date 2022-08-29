const Edit: React.FC = () => {
  return <></>
}

export default Edit

export async function getServerSideProps(context: any) {
  return {
    redirect: {
      destination: "/dashboard",
      permanent: true,
    },
  }
}
