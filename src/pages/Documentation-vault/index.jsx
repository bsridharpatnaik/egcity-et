import React, { useEffect, useState } from "react";
import Folder from "../../components/Folder";
import { ReactComponent as Left } from "../../assets/svgs/arrowleft.svg";
import AddButton from "../../components/AddButton";
import Menu from "../../components/Menu";
import Breadcrumb from "../../components/Breadcrumb";
import { useGetDocumentationVaultQuery } from "../../service/api";

const Documentation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [folderId, setFolderId] = useState("");
  const [folderData, setFolderData] = useState();
  const { data: fetchedData, refetch } = useGetDocumentationVaultQuery(
    folderId,
  );
  console.log(folderId, "folderdata ___>");
  const items = [
    {
      label: "Edit",
      onClick: () => {
        setShowMenu(false);
      },
    },
    {
      label: "Delete",
      onClick: () => {
        setShowMenu(false);
      },
    },
  ];

  const backClick = () => {
    setFolderId(folderData.parentFolderId || "");
  };

  useEffect(() => {
    if (fetchedData) {
      setFolderData(fetchedData);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (folderData?.name !== "root") refetch();
  }, [folderId]);

  // const folderDat = [
  //   { label: "Home", url: "/" },
  //   { label: "Documents", url: "/documents" },
  //   { label: "Project", url: "/documents/projects" },
  //   { label: "Current Folder", url: "/documents/projects/current" },
  // ];
  return (
    <div className="wrapper">
      <div className="wrapper_container_heading">
        <div className="text_container">
          <Left onClick={backClick} />
          <h5>Document Vault</h5>
        </div>
        <Breadcrumb data={folderData?.breadcrumb || []} />
      </div>
      {folderData &&
        folderData?.subFolders.map((item, index) => {
          return (
            <Folder item={item} refetch={refetch} setFolderId={setFolderId} />
          );
        })}
      <div className="add-btn">
        <AddButton
          onClick={() => setShowMenu((prev) => !prev)}
          style={{ position: "relative" }}
        />
        {showMenu && <Menu items={items} documentPage={true} />}
      </div>
    </div>
  );
};

export default Documentation;
