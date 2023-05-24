import ReactSearchBox from "react-search-box";
[
  {
      "term": "Automatic 2D-3D Registration without Contrast Agent during Neurovascular\n  Interventions",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D bi-ventricular segmentation of cardiac images by a\n  shape-refined multi-task deep learning approach",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D Cardiovascular MR Segmentation with Densely-Connected\n  Volumetric ConvNets",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D liver location and segmentation via convolutional neural\n  networks and graph cut",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D Liver Segmentation Using Sparse Representation of Global\n  and Local Image Information via Level Set Formulation",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D Mapping for Tree Diameter Measurements in Inventory\n  Operations",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D modelling of craniofacial form",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D object detection of Proteins in Fluorescent labeled\n  microscope images with spatial statistical analysis",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D Point Set Reconstruction from Stereo Laparoscopic Images\n  using Deep Neural Networks",
      "weight": 0,
      "payload": ""
  },
  {
      "term": "Automatic 3D Reconstruction of Manifold Meshes via Delaunay\n  Triangulation and Mesh Sweeping",
      "weight": 0,
      "payload": ""
  }
]

export default function SuggestDropdown() {
  return (
    <ReactSearchBox
      placeholder="Search for John, Jane or Mary"
      data={[
        {
          key: "Automatic 2D-3D Registration without Contrast Agent during Neurovascular\n  Interventions",
          value: "Automatic 2D-3D Registration without Contrast Agent during Neurovascular\n  Interventions"
        }
      ]}
      onSelect={(record: any) => console.log(record)}
      onFocus={() => {
        console.log("This function is called when is focussed");
      }}
      onChange={(value) => console.log(value)}
      autoFocus
      leftIcon={<>🎨</>}
      iconBoxSize="48px"
    />
  );
}