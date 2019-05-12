import { Component } from '@angular/core';
import DataSouce from 'devextreme/data/data_source';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { list2Tree } from 'app/libs/dynamic/util/listToTree';

export interface TreeNodeInterface {
    key: number;
    name: string;
    age: number;
    level: number;
    expand: boolean;
    address: string;
    children?: TreeNodeInterface[];
}

@Component({
    selector: "app-company",
    templateUrl: "./company.component.html"
})
export class CompanyComponent {
    isAllDisplayDataChecked = false;
    dataSource = new DataSouce({
        store: createStore({
            key: "id",
            loadUrl: "/api/admin/Rbac/company/load",
            updateUrl: "/api/admin/Rbac/company/update",
            deleteUrl: "/api/admin/Rbac/company/delete",
            insertUrl: "/api/admin/Rbac/company/insert",
        })
    });
    companys: any[] = [];
    keyword = "";
    listOfMapData = [
        {
            key: 1,
            name: 'John Brown sr.',
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [
                {
                    key: 11,
                    name: 'John Brown',
                    age: 42,
                    address: 'New York No. 2 Lake Park'
                },
                {
                    key: 12,
                    name: 'John Brown jr.',
                    age: 30,
                    address: 'New York No. 3 Lake Park',
                    children: [
                        {
                            key: 121,
                            name: 'Jimmy Brown',
                            age: 16,
                            address: 'New York No. 3 Lake Park'
                        }
                    ]
                },
                {
                    key: 13,
                    name: 'Jim Green sr.',
                    age: 72,
                    address: 'London No. 1 Lake Park',
                    children: [
                        {
                            key: 131,
                            name: 'Jim Green',
                            age: 42,
                            address: 'London No. 2 Lake Park',
                            children: [
                                {
                                    key: 1311,
                                    name: 'Jim Green jr.',
                                    age: 25,
                                    address: 'London No. 3 Lake Park'
                                },
                                {
                                    key: 1312,
                                    name: 'Jimmy Green sr.',
                                    age: 18,
                                    address: 'London No. 4 Lake Park'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            key: 2,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];

    mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

    collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
        if ($event === false) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.key === d.key)!;
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root: object): TreeNodeInterface[] {
        const stack: any[] = [];
        const array: any[] = [];
        const hashMap = {};
        stack.push({ ...root, level: 0, expand: false });

        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
                }
            }
        }

        return array;
    }

    visitNode(node: TreeNodeInterface, hashMap: { [key: string]: any }, array: TreeNodeInterface[]): void {
        if (!hashMap[node.key]) {
            hashMap[node.key] = true;
            array.push(node);
        }
    }

    ngOnInit(): void {
        this.listOfMapData.forEach(item => {
            this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
        });
    }
    nodes: any[] = []
    async  search() {
        this.companys = await this.dataSource.store().load();

    }
}   