<template>
<div class="editor-container">
  <!-- <div class="event-logs">
    <div v-for="[timestamp, type, log] in eventLogs" :key="`${timestamp}/${type}/${log}`">
      {{ timestamp }}
      <span class="event-type">{{ type }}</span>
      {{ log }}
    </div>
  </div> -->
  <div class="demo-control-panel appearance">
    <div>
      <div>添加组件</div>
      <div>
        <el-button class="edit" @click="createNewTransceiver">
        <img src="/Ellipse 1.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
        Add Transceiver
        </el-button>
      </div>
      <div>
      <el-button class="edit" @click="createNewEdfa">
        <img src="/Rectangle 1.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
        Add Edfa
      </el-button>
      </div>
      <div>
      <el-button class="edit" @click="createNewRoadm">
        <img src="/Ellipse 3.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
        Add Roadm
      </el-button>
      </div>
      <div>
      <el-button class="edit" @click="createNewFused">
        <img src="/Ellipse 2.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
        Add Fused
      </el-button>
      </div>
      <div>
      <el-button class="edit" @click="createNewFiber(selectedNodes[0], selectedNodes[1])">
        <img src="/Rectangle 2.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
        Add Fiber
      </el-button>
      </div>
      <div>
      <el-button class="edit" @click="addConnection(selectedNodes[0], selectedNodes[1])">
        <img src="/Vector.svg" alt="Add Transceiver" width="16" height="16" style="margin-right: 5px; background-color: transparent;">
        Add Connection
      </el-button>
      </div>
    </div>
  </div>
  <div class="network-editor-panel">
    <v-network-graph
      style="width: 100%; height: 700px;"
      tabindex="0"
      v-model:selectedNodes="selectedNodes"
      v-model:selectedEdges="selectedEdges"
      @keyup.delete="onDeleteKeyUp"
      :configs="configs"
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :eventHandlers="eventHandlers"
    />
  </div>
</div>
</template>

<style>
.editor-container {
  position: relative;
  width: 100%;
}

.demo-control-panel.appearance {
  position: absolute;
  top: 20px;
  left: 20px ;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.demo-control-panel > div > div {
  margin: 6px 0; /* 按钮间垂直间距 */
}



/* 主标题样式 */
.demo-control-panel > div > div:first-child {
  color: #666;
  font-size: 14px;
  margin: 12px 0 8px;
  padding-left: 16px;
}

/* 统一按钮样式 */
:deep(.edit) {
  width: 100% !important;    /* 新增 */
  display: flex !important;  /* 新增 */
  align-items: center;       /* 新增 */
  justify-content: flex-start; /* 新增 */
  /* 间距调整 */
  padding: 8px 16px !important;
  margin: 4px 0 !important;

  /* 文字样式 */
  font-size: 14px !important;
  color: #333 !important;
  letter-spacing: 0.5px;

  /* 边框背景 */
  background: #f8f9fa !important;
  border: 1px solid #dee2e6 !important;
  transition: all 0.2s ease;
}


/* 统一图标样式 */
:deep(.edit img) {
  width: 16px !important;  /* 强制统一图标宽度 */
  height: 16px !important; /* 强制统一图标高度 */
  margin-right: 12px !important; /* 图标文字间距 */
  object-fit: contain;  /* 保持图标比例 */
  background-color: transparent !important; /* 统一背景 */
  flex-shrink: 0;  /* 禁止图标压缩 */
}

/* 文字对齐处理 */
:deep(.edit > span) {
  text-align: left !important;
  white-space: nowrap;  /* 防止文字换行 */
  flex-grow: 1;  /* 允许文字部分扩展 */
}

.edit {
  color: #333 !important;
  background-color: #f8f9fa !important;
  border: 1px solid #dee2e6 !important;
  transition: all 0.2s ease;
}

.edit:hover {
  color: #F7881A !important;
  background-color: #ffecd9 !important;
}

.edit:active {
  color: #F7881A !important;
  background-color: #ffecd9 !important;
}

.network-editor-panel {
  position: relative;
  z-index: 1;
  width: 100%;
}

  .event-logs {
    top: 0;
    right: 0;
    height: 300px;
    overflow-y: auto;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border-left: 1px solid #ccc;
  }
  .event-logs > div {
    margin-bottom: 5px;
  }
  .event-logs .event-type {
    font-weight: bold;
    margin-right: 5px;
  }
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import * as vNG from 'v-network-graph';
import { onMounted } from 'vue';
import { format } from "date-fns/format";
import { useRoute } from 'vue-router';

// API 请求
import { getNetworkByIdAPI } from '@/api/networks';
import { createNewElementAPI } from '@/api/topology';
import { updateElementAPI } from '@/api/topology';
import { deleteElementAPI } from '@/api/topology';
import { createNewConnectionAPI } from '@/api/topology';
import { updateConnectionAPI } from '@/api/topology';
import { deleteConnectionAPI } from '@/api/topology';


interface Node extends vNG.Node {
  size: number;
  color: string;
  shape: 'circle' | 'rect';
  data?: any;
  fiberInfo?: { fiber_in: string, fiber_out: string };
}

interface Edge extends vNG.Edge {
  width: number;
  color: string;
  dashed?: boolean;
}

const route = useRoute();  // 获取当前路由
const networkId = route.params.networkId;  // 从路由参数中获取 networkId
console.log("Current network ID:", route.params.networkId);

const EVENTS_COUNT = 10

const eventLogs = reactive<[string, string, string][]>([])

const eventHandlers: vNG.EventHandlers = {
  // wildcard: capture all events
  "*": (type, event) => {
    const timestamp = format(new Date(), "HH:mm:ss.SSS")
    if (eventLogs.length > EVENTS_COUNT) {
      eventLogs.splice(EVENTS_COUNT, eventLogs.length - EVENTS_COUNT)
    }
    if (event instanceof Object && "event" in event) {
      Object.assign(event, { event: "(...)" })
    }
    eventLogs.unshift([timestamp, type, JSON.stringify(event)])
  },
  "node:dragend": (event) => {
    // 在拖动位置完成后，调用 API 更新后端内节点位置，遍历键值对，更新每个节点的位置
    Object.entries(event).map(([nodeId, { x, y }]) => {
      // 结合节点的 data 字段，将 data 中字段和 metadata 都加入到临时 params 中，更新节点位置
      const node = nodes[nodeId];
      const params = {
        metadata: {
          location: {
            x: x,
            y: y,
          },
        },
        name: node.name,
        ...node.data,
      };
      // 打印测试数据
      console.log('Node:', node);
      console.log('Params:', params);

      if (node) {
        updateElementAPI(
          networkId,
          nodeId,
          params
        ).then((element) => {
          console.log('更新节点位置成功', element);
        }).catch((error) => {
          console.error('更新节点位置失败', error);
        });
      }

      const fiberIdSet = movingHandler(event);

      // 处理移动过的 Fiber
      fiberIdSet.forEach((fiberNodeId) => {
        const fiberNode = nodes[fiberNodeId];
        const fiberParams = {
          metadata: {
            location: layouts.nodes[fiberNodeId],
          },
          name: fiberNode.name,
          ...fiberNode.data,
        };
        if (fiberNode) {
          updateElementAPI(
            networkId,
            fiberNodeId,
            fiberParams
          ).then((element) => {
            console.log('更新 Fiber 节点位置成功', element);
          }).catch((error) => {
            console.error('更新节点位置失败', error);
          });
        }
      });
    });
  },
  "node:pointermove": (event) => movingHandler(event),
}

const movingHandler = (event) => {
  const fiberIdSet = new Set<string>();
  Object.entries(event).map(([nodeId, { x, y }]) => {
    const fiberNeighboursList = fiberNeighbours[nodeId];
    // // 打印测试数据
    // console.log(fiberNeighboursList)
    // fiberNeighboursList.forEach(fiberNodeId => {console.log(nodes[fiberNodeId])})
    // 遍历相邻的 Fiber 节点
    if (fiberNeighboursList) {
      fiberNeighboursList.forEach(fiberNodeId => {
        const fiberNode = nodes[fiberNodeId]; // 获取 Fiber 节点对象
        // 检查 Fiber 节点是否存在，若不存在，移除 fiberNeighbours 中的记录
        if (!fiberNode) {
          const index = fiberNeighboursList.indexOf(fiberNodeId);
          if (index > -1) {
            fiberNeighboursList.splice(index, 1);
          }
          return;
        }

        const fiberInfo = fiberNode.fiberInfo; // 获取 Fiber 的 fiber_in 和 fiber_out 信息

        if (fiberInfo) {
          const fiberInNode = layouts.nodes[fiberInfo.fiber_in]; // 获取 fiber_in 节点
          const fiberOutNode = layouts.nodes[fiberInfo.fiber_out]; // 获取 fiber_out 节点

          if (fiberInNode && fiberOutNode) {
            // 计算 fiber_in 和 fiber_out 节点的中点坐标
            const midpointX = (fiberInNode.x + fiberOutNode.x) / 2;
            const midpointY = (fiberInNode.y + fiberOutNode.y) / 2;

            // 测试输出
            // console.log("Calc mid location: ", midpointX, midpointY)

            // 更新 Fiber 节点的位置
            layouts.nodes[fiberNodeId] = {
              x: midpointX,
              y: midpointY,
            };

            fiberIdSet.add(fiberNodeId)
          }
        }
      });
    }
  })
  return fiberIdSet;
}

function onDeleteKeyUp() {
  if (selectedNodes.value.length > 0) {
    const names = selectedNodes.value.map(n => nodes[n].name).join(", ")
    const confirmed = confirm(`Are you sure you want to delete [${names}]?`)
    if (confirmed) {
      selectedNodes.value.forEach(n => {
        deleteElementAPI(networkId, n).then(() => {
          console.log('删除节点成功', n);
        }).catch((error) => {
          console.error('删除节点失败', error);
        });
        // 删除非 Fiber 节点时，需要根据 fiberNeighbours 删除相应的 Fiber 节点的 fiber_in 或 fiber_out 信息，并移除 fiberNeighbours 中的记录
        if (nodes[n].data.type !== 'Fiber') {
          const fiberNeighboursList = fiberNeighbours[n];
          if (fiberNeighboursList) {
            fiberNeighboursList.forEach(fiberNodeId => {
              const fiberNode = nodes[fiberNodeId];
              const fiberInfo = fiberNode.fiberInfo;
              if (fiberInfo) {
                if (fiberInfo.fiber_in === n) {
                  fiberNode.fiberInfo = { fiber_in: undefined, fiber_out: fiberInfo.fiber_out };
                }
                if (fiberInfo.fiber_out === n) {
                  fiberNode.fiberInfo = { fiber_in: fiberInfo.fiber_in, fiber_out: undefined };
                }
              }
            });
            delete fiberNeighbours[n];
          }
        }
        // 删除 Fiber 节点时，需要移除其相邻节点 fiber_in fiber_out 在 fiberNeighbours 中对该 Fiber 的记录
        if (nodes[n].data.type === 'Fiber') {
          const fiberInfo = nodes[n].fiberInfo;
          if (fiberInfo) {
            if (fiberInfo.fiber_in) {
              const fiberInNeighbours = fiberNeighbours[fiberInfo.fiber_in];
              if (fiberInNeighbours) {
                const index = fiberInNeighbours.indexOf(n);
                if (index > -1) {
                  fiberInNeighbours.splice(index, 1);
                }
              }
            }
            if (fiberInfo.fiber_out) {
              const fiberOutNeighbours = fiberNeighbours[fiberInfo.fiber_out];
              if (fiberOutNeighbours) {
                const index = fiberOutNeighbours.indexOf(n);
                if (index > -1) {
                  fiberOutNeighbours.splice(index, 1);
                }
              }
            }
          }
        }
        // Debug
        console.log('fiberNeighbours:', fiberNeighbours);
        // 删除本地数据
        delete nodes[n];
      });
    }
  } else if (selectedEdges.value.length > 0) {
    const connection_ids = selectedEdges.value.map(e => edges[e].connectionId).join(", ")
    const confirmed = confirm(`Are you sure you want to delete [${connection_ids}]?`)
    if (confirmed) {
      // Debug
      console.log('selectedEdges:', selectedEdges.value);
      selectedEdges.value.forEach(e => {
        const connectionId = edges[e].connectionId;
        deleteConnectionAPI(networkId, connectionId).then(() => {
          console.log('删除连接成功', connectionId);
        }).catch((error) => {
          console.error('删除连接失败', error);
        });
        // 若连接的节点中有 Fiber 节点，则需要删除 FiberInfo 中的 fiber_in 或 fiber_out 信息
        const fromNode = edges[e].source;
        const toNode = edges[e].target;
        if (nodes[fromNode].data.type === 'Fiber') {
          const fiberInfo = nodes[fromNode].fiberInfo;
          if (fiberInfo) {
            if (fiberInfo.fiber_out === toNode) {
              nodes[fromNode].fiberInfo = { fiber_in: fiberInfo.fiber_in, fiber_out: undefined };
            }
          }
        }
        if (nodes[toNode].data.type === 'Fiber') {
          const fiberInfo = nodes[toNode].fiberInfo;
          if (fiberInfo) {
            if (fiberInfo.fiber_in === fromNode) {
              nodes[toNode].fiberInfo = { fiber_in: undefined, fiber_out: fiberInfo.fiber_out };
            }
          }
        }
        // 若连接的节点中有 Fiber 节点，则需要更新 fiberNeighbours 中的记录，移除非 Fiber 节点的到该 Fiber 的邻居信息
        if (nodes[fromNode].data.type !== 'Fiber' && nodes[toNode].data.type === 'Fiber') {
          const fiberNeighboursList = fiberNeighbours[fromNode];
          if (fiberNeighboursList) {
            const index = fiberNeighboursList.indexOf(toNode);
            if (index > -1) {
              fiberNeighboursList.splice(index, 1);
            }
          }
        }
        if (nodes[toNode].data.type !== 'Fiber' && nodes[fromNode].data.type === 'Fiber') {
          const fiberNeighboursList = fiberNeighbours[toNode];
          if (fiberNeighboursList) {
            const index = fiberNeighboursList.indexOf(fromNode);
            if (index > -1) {
              fiberNeighboursList.splice(index, 1);
            }
          }
        }
        // 删除本地数据
        edges.splice(e, 1);
      })
    }
  }
}

// 样式配置
const configs = reactive(
  vNG.defineConfigs<Node, Edge>({
    view: {
      grid: {
        visible: true,
        interval: 20,
        thickIncrements: 5,
        line: {
          color: "#e0e0e0",
          width: 1,
          dasharray: 1,
        },
        thick: {
          color: "#cccccc",
          width: 1,
          dasharray: 0,
        },
      },
      layoutHandler: new vNG.GridLayout({ grid: 10 }),
      scalingObjects: true,
      minZoomLevel: 0.1,
      maxZoomLevel: 16,
    },
    node: {
      normal: {
        type: node => node.shape === 'circle' ? 'circle' : 'rect', // 根据 shape 属性选择形状
        radius: node => node.shape === 'circle' ? node.size : 0, // 圆形的半径
        width: node => node.shape === 'rect' ? node.size : 0, // 矩形的宽度
        height: node => node.shape === 'rect' ? node.size : 0, // 矩形的高度
        color: node => node.color,
      },
      hover: {
        radius: node => node.shape === 'circle' ? node.size + 2 : 0, // 增大圆形的半径
        width: node => node.shape === 'rect' ? node.size + 2 : 0, // 增大矩形的宽度
        height: node => node.shape === 'rect' ? node.size + 2 : 0, // 增大矩形的高度
        color: node => node.color,
      },
      selectable: 2,
      draggable: node => node.draggable,
      focusring: {
        color: 'darkgray',
      },
    },
    edge: {
      normal: {
        width: edge => edge.width,
        color: edge => edge.color,
        dasharray: edge => (edge.dashed ? '4' : '0'),
      },
      marker: {
        source: {
          type: "none",
          width: 4,
          height: 4,
          margin: -1,
          offset: 0,
          units: "strokeWidth",
          color: null,
        },
        target: {
          type: "arrow",
          width: 4,
          height: 4,
          margin: -1,
          offset: 0,
          units: "strokeWidth",
          color: null,
        },
      },
      gap: 8,
      type: "straight",
      selectable: true,
    },
  })
);

// 数据
const nodes = reactive({});
const edges = reactive([]);
const selectedNodes = ref([]);  // 选中的节点
const selectedEdges = ref([]);  // 选中的连接
const layouts = reactive({
  nodes: {}
});
const fiberNeighbours = reactive({});


const loadNodeFromElement = (element: any) => {
  let shape = 'circle'; // 默认是圆形
  let color = 'gray';   // 默认颜色为灰色
  let size = 20;        // 默认大小

  // 设置不同节点类型的形状、颜色和大小
  if (element.type === 'Edfa') {
    shape = 'rect'; // 如果是 EDFA 类型，则为矩形
    color = '#CC503E';
    size = 30;      // 矩形的默认大小
  } else if (element.type === 'Transceiver') {
    color = '#F7881A'; // Transceiver 类型为圆形，颜色为蓝色
    size = 20;      // 圆形的默认大小
  } else if (element.type === 'Roadm') {
    color = '#D5ECAE'; // Roadm 类型为圆形，颜色为绿色
    size = 20;       // 圆形的默认大小
  } else if (element.type === 'Multiband_amplifier') {
    shape = 'rect'; // 如果是 EDFA 类型，则为矩形
    color = '#f87171';
    size = 30;
  } else if (element.type === 'Fiber' || element.type === 'RamanFiber') {
    shape = 'rect'; // 如果是 Fiber 类型，则为矩形
    color = '#B7E8FF';
    size = 15;
  }

  // 预处理 element 副本数据，移除已储存的字段(element_id, name, metadata)
  // 获取副本
  const elementCopy = { ...element };
  // 移除字段
  delete elementCopy.element_id;
  delete elementCopy.name;
  delete elementCopy.metadata;

  var nodeDraggable = true;
  // 对于 Fiber 类型，不可拖动
  if (element.type === 'Fiber') {
    nodeDraggable = false;
  }

  // 将节点数据绑定到 nodes 中
  nodes[`${element.element_id}`] = {
    name: element.name,
    size: size, // 根据节点类型设置大小
    color: color, // 根据节点类型设置颜色
    shape: shape,
    draggable: nodeDraggable, // 设置节点可拖动
    data: elementCopy, // 将后端数据绑定到 data 中
  };

  // 直接将位置绑定到 layouts 中，确保每个节点的坐标从后端数据获取
  layouts.nodes[`${element.element_id}`] = {
    x: element.metadata.location.x,
    y: element.metadata.location.y,
  };

  // 打印测试数据
  console.log('Node:', nodes[`${element.element_id}`]);
}

const loadEdgeFromConnection = (connection: any) => {
  let edgeColor = 'black'; // 默认边颜色为黑色

  edges.push({
    source: `${connection.from_node}`,
    target: `${connection.to_node}`,
    connectionId: connection.connection_id,
    width: 2,
    color: edgeColor, // 设置连接线的颜色
  });

  // 将非 Fiber 节点的直接相邻 Fiber 加入到 fiberNeighbours 键值对中，键名为非 Fiber 节点 ID，值为相邻 Fiber 节点 ID 列表，不考虑方向
  if (nodes[`${connection.from_node}`].data.type !== 'Fiber' && nodes[`${connection.to_node}`].data.type == 'Fiber') {
    if (fiberNeighbours[`${connection.from_node}`] === undefined) {
      fiberNeighbours[`${connection.from_node}`] = [];
    }
    fiberNeighbours[`${connection.from_node}`].push(`${connection.to_node}`);
    // 设定 Fiber 节点的 fiber_in 信息，FiberInfo 的 fiber_out 保持原数值，若不存在，使用 undefined
    nodes[`${connection.to_node}`].fiberInfo = { fiber_in: `${connection.from_node}`, fiber_out: nodes[`${connection.to_node}`].fiberInfo?.fiber_out };
  }
  if (nodes[`${connection.to_node}`].data.type !== 'Fiber' && nodes[`${connection.from_node}`].data.type == 'Fiber') {
    if (fiberNeighbours[`${connection.to_node}`] === undefined) {
      fiberNeighbours[`${connection.to_node}`] = [];
    }
    fiberNeighbours[`${connection.to_node}`].push(`${connection.from_node}`);
    // 设定 Fiber 节点的 fiber_out 信息，FiberInfo 的 fiber_in 保持原数值，若不存在，使用 undefined
    nodes[`${connection.from_node}`].fiberInfo = { fiber_in: nodes[`${connection.from_node}`].fiberInfo?.fiber_in, fiber_out: `${connection.to_node}` };
  }
}

// 预设的后端数据
const loadNetworkDataFromAPI = async () => {
  try {
    const data = await getNetworkByIdAPI(networkId);  // 调用接口获取网络数据
    // 打印返回的数据
    console.log('Network:', data);
    // 处理节点数据
    data.elements.forEach((element: any) => {
      // 打印测试数据
      console.log('Element:', element);
      // 加载节点
      loadNodeFromElement(element);
    });

    // 处理连接数据
    data.connections.forEach((connection: any) => {
      // 打印测试数据
      console.log('Connection:', connection);
      // 加载连接
      loadEdgeFromConnection(connection);
    });

    // 打印测试数据
    // 检验 Fiber 节点的相邻节点是否正确
    console.log("fiberNeighbors :")
    for (const [key, value] of Object.entries(fiberNeighbours)) {
      console.log(`Key: ${key}, Value: ${value}`);
    }

    // 打印结束标识
    console.log('Network data loaded');
  } catch (error) {
    console.error('获取光网络数据失败', error);
  }
};

// 在组件挂载时调用
onMounted(() => {
  let intervalId: number;
  loadNetworkDataFromAPI();
  // intervalId = setInterval(updateNodeToBackend, 5000);  // 每5秒执行一次  // 在组件挂载时调用
});

const createNewTransceiver = () => {
  const nextNodeIndex = ref(Object.keys(nodes).length + 1)
  createNewElementAPI(networkId, {
    name: `Transceiver-${nextNodeIndex.value}`,
    type: "Transceiver",
    metadata: { location: { x: 0, y: 0 } }
  }).then((element) => {
    loadNodeFromElement(element);
    console.log('创建 Transceiver 成功', element);
  }).catch((error) => {
    console.error('创建 Transceiver 失败', error);
  });
};

const createNewEdfa = () => {
  const nextNodeIndex = ref(Object.keys(nodes).length + 1)
  createNewElementAPI(networkId, {
    name: `Edfa-${nextNodeIndex.value}`,
    type: "Edfa",
    metadata: { location: { x: 0, y: 0 } }
  }).then((element) => {
    loadNodeFromElement(element);
    console.log('创建 Edfa 成功', element);
  }).catch((error) => {
    console.error('创建 Edfa 失败', error);
  });
};

const createNewRoadm = () => {
  const nextNodeIndex = ref(Object.keys(nodes).length + 1)
  createNewElementAPI(networkId, {
    name: `Roadm-${nextNodeIndex.value}`,
    type: "Roadm",
    metadata: { location: { x: 0, y: 0 } }
  }).then((element) => {
    loadNodeFromElement(element);
    console.log('创建 Roadm 成功', element);
  }).catch((error) => {
    console.error('创建 Roadm 失败', error);
  });
};

const createNewFused = () => {
  const nextNodeIndex = ref(Object.keys(nodes).length + 1)
  createNewElementAPI(networkId, {
    name: `Fused-${nextNodeIndex.value}`,
    type: "Fused",
    metadata: { location: { x: 0, y: 0 } }
  }).then((element) => {
    loadNodeFromElement(element);
    console.log('创建 Fused 成功', element);
  }).catch((error) => {
    console.error('创建 Fused 失败', error);
  });
};

// 创建 Fiber 节点，Fiber 需要连接两个节点，所以需要两个节点的 ID
const createNewFiber = (fromNode: string, toNode: string) => {
  const nextNodeIndex = ref(Object.keys(nodes).length + 1)
  // 计算中点
  const fiberInNode = layouts.nodes[fromNode]; // 获取 fiber_in 节点
  const fiberOutNode = layouts.nodes[toNode]; // 获取 fiber_out 节点
  // 计算 fiber_in 和 fiber_out 节点的中点坐标
  const midpointX = (fiberInNode.x + fiberOutNode.x) / 2;
  const midpointY = (fiberInNode.y + fiberOutNode.y) / 2;
  createNewElementAPI(networkId, {
    name: `Fiber-${nextNodeIndex.value}`,
    type: "Fiber",
    metadata: { location: { x: midpointX, y: midpointY } }
  }).then((element) => {
    // 打印测试数据
    console.log('Element 数据：', element);
    // 创建 Fiber 后，需要创建连接
    addConnection(fromNode, element.element_id);
    addConnection(element.element_id, toNode);
    loadNodeFromElement(element);
    console.log('创建 Fiber 成功', element);
  }).catch((error) => {
    console.error('创建 Fiber 失败', error);
  });
};

const addConnection = (fromNode: string, toNode: string) => {
  // 检查是否已经存在连接
  const existingEdge = edges.find(edge => edge.source === fromNode && edge.target === toNode);
  if (existingEdge) {
    console.log('连接已存在', existingEdge);
    return;
  }
  createNewConnectionAPI(networkId, {
    from_node: fromNode,
    to_node: toNode,
  }).then((connection) => {
    loadEdgeFromConnection(connection);
    console.log('创建 Connection 成功', connection);
  }).catch((error) => {
    console.error('创建 Connection 失败', error);
  });
};

</script>
